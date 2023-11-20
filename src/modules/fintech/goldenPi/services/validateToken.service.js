const sharedConstants = require("shared/constants");
const sharedServices = require("shared/services");
const iamServices = require("app_modules/common/services/iam.services");
const sharedModels = require("shared/models");
const goldenPiParsers = require("../parsers");
const goldenPiConstants = require("../constants");

module.exports = async ({ token, requestId }) => {
  sharedServices.loggerServices.success.info({
    requestId,
    stage: "Golden Pi validate token - Request params",
    msg: "Params recieved",
    token,
  });

  // validate token
  sharedServices.authServices.validateJWT(
    token,
    sharedConstants.appConfig.goldenPi.jwtSecret
  );

  // decode token
  const data = sharedServices.authServices.decodeJWT(
    token,
    sharedConstants.appConfig.goldenPi.jwtSecret
  );

  const { customerRefId, customerId, fintechId } = data;

  // check if customer is already linked with the fintech
  const customerFintechLinking = await sharedModels.fintechCustomerLinking.read(
    {
      customerId,
      fintechId,
    }
  );

  // check if customer has provided consent for that fintech
  const customerConsent = await sharedModels.customerConsent.read({
    customerId,
    fintechId,
  });
  const { status } = customerConsent[0] ? customerConsent[0] : "";

  if (
    status &&
    status == goldenPiConstants.validateToken.consentStatus.APPROVED
  ) {
    // get customer details
    const customerDetails = await iamServices.getUserDetails(
      customerRefId,
      goldenPiConstants.validateToken.requestedData.customerDetails
    );

    sharedServices.loggerServices.success.info({
      requestId,
      stage: "Golden Pi validate token - consent approved",
      msg: "Consent approved by customer",
      ...customerDetails,
    });

    const parsedCustomerDetails = goldenPiParsers.customerDetails({
      customerDetails,
    });

    // create entry in fintech_customer_linking
    if (!customerFintechLinking.length) {
      sharedServices.loggerServices.success.info({
        requestId,
        stage: "Golden Pi validate token - Linking customer",
        msg: "Link customer to fintech and return customer data",
        fintechId,
        customerId,
        customer_data: parsedCustomerDetails,
      });

      await sharedModels.fintechCustomerLinking.create(
        fintechId,
        customerId,
        "",
        ""
      );
    }

    sharedServices.loggerServices.success.info({
      requestId,
      stage: "Golden Pi validate token - return customer data",
      msg: "Return customer data",
      fintechId,
      customerId,
      customer_data: parsedCustomerDetails,
    });

    return [parsedCustomerDetails];
  } else {
    const emptyCustomerDetails = goldenPiParsers.emptyCustomerDetails({
      customerRefId,
    });

    // create entry in fintech_customer_linking
    if (!customerFintechLinking.length) {
      sharedServices.loggerServices.success.info({
        requestId,
        stage: "Golden Pi validate token - Linking customer",
        msg: "Link customer to fintech and return empty customer data",
        fintechId,
        customerId,
        customer_data: emptyCustomerDetails,
      });

      await sharedModels.fintechCustomerLinking.create(
        fintechId,
        customerId,
        "",
        ""
      );
    }

    sharedServices.loggerServices.success.info({
      requestId,
      stage: "Golden Pi validate token - return empty customer data",
      msg: "Return customer data",
      fintechId,
      customerId,
      customer_data: emptyCustomerDetails,
    });

    return [emptyCustomerDetails];
  }
};
