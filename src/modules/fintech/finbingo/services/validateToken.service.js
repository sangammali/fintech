const sharedConstants = require("shared/constants");
const finbingoConstants = require("../constants");
const finbingoParser = require("../parser");
const sharedServices = require("shared/services");
const iamServices = require("app_modules/common/services/iam.services");
const sharedModels = require("shared/models");

module.exports = async ({ token, requestId }) => {
  sharedServices.loggerServices.success.info({
    requestId,
    stage: "Finbingo validate token - Request params",
    msg: "Request params recieved",
    token,
  });

  // validate token
  sharedServices.authServices.validateJWT(
    token,
    sharedConstants.appConfig.finbingo.jwtSecret
  );

  // decode token
  const data = sharedServices.authServices.decodeJWT(
    token,
    sharedConstants.appConfig.finbingo.jwtSecret
  );

  const { customerRefId, customerId, fintechId, moduleName } = data;

  // check if customer is already linked with the fintech
  const customerFintechLinking = await sharedModels.fintechCustomerLinking.read(
    {
      customerId,
      fintechId,
      moduleName,
    }
  );

  // check if customer has provided consent for that fintech
  const customerConsent = await sharedModels.customerConsent.read({
    customerId,
    fintechId,
  });
  const { status } = customerConsent[0];

  if (status == finbingoConstants.validateToken.consentStatus.APPROVED) {
    // get customer details
    const customerDetails = await iamServices.getUserDetails(
      customerRefId,
      finbingoConstants.validateToken.requestedData.customerDetails
    );

    const parsedCustomerDetails = finbingoParser.customerDetails({
      customerRefId,
      customerDetails,
    });

    // create entry in fintech_customer_linking
    if (!customerFintechLinking.length) {
      sharedServices.loggerServices.success.info({
        requestId,
        stage: "Finbingo validate token - Customer fintech linking",
        msg: "Link customer with fintech and return details of customer",
        fintechId,
        customerId,
        ...parsedCustomerDetails,
      });

      await sharedModels.fintechCustomerLinking.create(
        fintechId,
        customerId,
        "",
        moduleName
      );
    }

    return [parsedCustomerDetails];
  } else {
    const emptyCustomerDetails = finbingoParser.emptyCustomerDetails({
      customerRefId,
    });

    // create entry in fintech_customer_linking
    if (!customerFintechLinking.length) {
      sharedServices.loggerServices.success.info({
        requestId,
        stage: "Finbingo validate token - Customer fintech linking",
        msg: "Link customer with fintech and return empty details of customer",
        fintechId,
        customerId,
        ...emptyCustomerDetails,
      });

      await sharedModels.fintechCustomerLinking.create(
        fintechId,
        customerId,
        "",
        moduleName
      );
    }

    return [emptyCustomerDetails];
  }
};
