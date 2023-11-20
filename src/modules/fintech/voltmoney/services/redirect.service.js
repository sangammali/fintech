const sharedServices = require("shared/services");
const dbLoggerServices = require("shared/services/dbLogger.services");
const centrumServices = require("app_modules/common/services/centrum.services");
const iamServices = require("app_modules/common/services/iam.services");
const sharedModels = require("shared/models");
const sharedConstants = require("shared/constants");
const voltmoneyConstants = require("../constants");
const voltmoneyParser = require("../parser");
const axios = require("axios");

module.exports = async ({ customerRefId, customerId, requestId }) => {
  sharedServices.loggerServices.success.info({
    requestId,
    stage: "Voltmoney redirect - Request params",
    msg: "Request params recieved",
    customerRefId,
    customerId,
  });

  // get fintech details
  const fintechDetails = await sharedModels.fintech.read({
    fintechName: sharedConstants.masterConstants.FINTECH.VOLTMONEY,
  });

  const { fintechId, appKey, appSecret } = fintechDetails[0];

  // check whether customer is new or old
  const customerLinked = await sharedModels.fintechCustomerLinking.read({
    customerId,
    fintechId,
  });

  const fintechConfig = await sharedModels.fintechConfig.read({
    fintechId,
  });

  // generate auth token ---
  const generateAuthTokenConfig = fintechConfig.filter(
    (e) => e.apiName == voltmoneyConstants.redirect.apiName.generateAuthToken
  );

  const { apiEndpoint: generateAuthCodeApi } = generateAuthTokenConfig[0];

  const generateAuthCodeRequestId =
    sharedServices.mysqlHelperServices.generateRefID(
      voltmoneyConstants.redirect.apiName.generateAuthToken,
      sharedConstants.masterConstants.FINTECH.VOLTMONEY
    );
  const generateAuthCodeRequestUrl = generateAuthCodeApi;
  const generateAuthCodePayload = {
    app_key: appKey,
    app_secret: appSecret,
  };
  const generateAuthCodeHeaders = {
    "X-AppPlatform": sharedConstants.masterConstants.PLATFORM_CODE.CENTRUM,
    requestReferenceId: generateAuthCodeRequestId,
  };

  let authKey;

  const generateAuthKey = await axios.post(
    generateAuthCodeRequestUrl,
    generateAuthCodePayload,
    { headers: generateAuthCodeHeaders }
  );

  if (generateAuthKey.status == 200) {
    await dbLoggerServices.log({
      fintechId,
      customerId,
      action: voltmoneyConstants.redirect.action.GENERATE_AUTH_KEY,
      request: {
        generateAuthCodeRequestUrl,
        generateAuthCodePayload,
        headers: generateAuthCodeHeaders,
      },
      response: generateAuthKey.data,
      code: generateAuthKey.status,
    });

    authKey = generateAuthKey.data.auth_token;
  } else {
    await dbLoggerServices.log({
      fintechId,
      customerId,
      action: voltmoneyConstants.redirect.action.GENERATE_AUTH_KEY,
      request: {
        generateAuthCodeRequestUrl,
        generateAuthCodePayload,
        headers: generateAuthCodeHeaders,
      },
      response: generateAuthKey.message,
      code: generateAuthKey.status,
    });

    sharedServices.error.throw(
      voltmoneyConstants.redirect.errorMessages.FVME0002
    );
  }

  // New customer
  if (!customerLinked.length) {
    sharedServices.loggerServices.success.info({
      requestId,
      stage: "Voltmoney redirect - New customer",
      msg: "Customer does not exist, creating a new customer",
    });

    // get customer details
    const customerDetails = await iamServices.getUserDetails(
      customerRefId,
      voltmoneyConstants.redirect.requestedData.createCustomer
    );

    // get documents from centrum
    const documentDetails = await centrumServices.getDocuments(customerRefId);

    sharedServices.loggerServices.success.info({
      requestId,
      stage: "Voltmoney redirect - Get document details",
      msg: "Fetched document details of customer",
      customerRefId,
      documentDetails,
    });

    // get customer photo
    const customerPhoto = await centrumServices.getCustomerPhoto(customerRefId);

    sharedServices.loggerServices.success.info({
      requestId,
      stage: "Voltmoney redirect - Get customer photo",
      msg: "Fetched photo of customer",
      customerRefId,
      customerPhoto,
    });

    // Parser: Prepare data for create customer
    const createCustomerData = voltmoneyParser.createCustomer({
      customerDetails,
      documentDetails,
      customerPhoto,
    });

    sharedServices.loggerServices.success.info({
      requestId,
      stage: "Voltmoney redirect - Parsed customer data",
      msg: "Parsed customer data",
      customerData: createCustomerData,
    });

    // get fintech config for create customer
    const createCustomerConfig = fintechConfig.filter(
      (e) => e.apiName == voltmoneyConstants.redirect.apiName.createCustomer
    );

    const { apiEndpoint: createCustomerApi } = createCustomerConfig[0];

    const createCustomerRequestId =
      sharedServices.mysqlHelperServices.generateRefID(
        voltmoneyConstants.redirect.apiName.createCustomer,
        sharedConstants.masterConstants.FINTECH.VOLTMONEY
      );
    const createCustomerUrl = createCustomerApi;
    const createCustomerPayload = createCustomerData;
    const createCustomerHeaders = {
      "X-AppPlatform": sharedConstants.masterConstants.PLATFORM_CODE.CENTRUM,
      requestReferenceId: createCustomerRequestId,
      Authorization: `Bearer ${authKey}`,
    };

    sharedServices.loggerServices.success.info({
      requestId,
      stage: "Voltmoney redirect - Creating customer in voltmoney",
      msg: "Initializing customer creation at voltmoney",
      customerData: {
        createCustomerUrl,
        createCustomerData,
        createCustomerHeaders,
      },
    });

    // Create customer at voltmoney
    const createCustomer = await axios.post(
      createCustomerUrl,
      createCustomerPayload,
      { headers: createCustomerHeaders }
    );
    let voltmoneyCustomerId;

    if (createCustomer.status == 200) {
      await dbLoggerServices.log({
        fintechId,
        customerId,
        action: voltmoneyConstants.redirect.action.CREATE_CUSTOMER,
        request: {
          createCustomerUrl,
          createCustomerPayload,
          headers: createCustomerHeaders,
        },
        response: createCustomer.data,
        code: createCustomer.status,
      });

      voltmoneyCustomerId = createCustomer.data.voltCustomerCode;
    } else {
      await dbLoggerServices.log({
        fintechId,
        customerId,
        action: voltmoneyConstants.redirect.action.CREATE_CUSTOMER,
        request: {
          createCustomerUrl,
          createCustomerPayload,
          headers: createCustomerHeaders,
        },
        response: createCustomer.message,
        code: createCustomer.status,
      });

      return sharedServices.error.throw(
        voltmoneyConstants.redirect.errorMessages.FVME0003
      );
    }

    // create customer fintech linking ---
    await sharedModels.fintechCustomerLinking.create(
      fintechId,
      customerId,
      voltmoneyCustomerId,
      ""
    );

    sharedServices.loggerServices.success.info({
      requestId,
      stage: "Voltmoney redirect - Customer fintech linking",
      msg: "Customer created and linked to fintech",
      customerId,
      fintechId,
      voltmoneyCustomerId,
    });

    // get customer SSO token ---
    const getCustomerSSOTokenConfig = fintechConfig.filter(
      (e) =>
        e.apiName == voltmoneyConstants.redirect.apiName.getCustomerSSOToken
    );

    const { apiEndpoint: getCustomerSSOTokenApi } =
      getCustomerSSOTokenConfig[0];

    const getCustomerSSOTokenRequestId =
      sharedServices.mysqlHelperServices.generateRefID(
        voltmoneyConstants.redirect.apiName.getCustomerSSOToken,
        sharedConstants.masterConstants.FINTECH.VOLTMONEY
      );
    const getCustomerSSOTokenUrl = getCustomerSSOTokenApi + voltmoneyCustomerId;
    const getCustomerSSOTokenHeaders = {
      "X-AppPlatform": sharedConstants.masterConstants.PLATFORM_CODE.CENTRUM,
      requestReferenceId: getCustomerSSOTokenRequestId,
      Authorization: `Bearer ${authKey}`,
    };
    let customerSSOToken;

    const getCustomerSSOToken = await axios.get(getCustomerSSOTokenUrl, {
      headers: getCustomerSSOTokenHeaders,
    });

    if (getCustomerSSOToken.status == 200) {
      await dbLoggerServices.log({
        fintechId,
        customerId,
        action: voltmoneyConstants.redirect.action.GENERATE_SSO_TOKEN,
        request: {
          getCustomerSSOTokenUrl,
          headers: getCustomerSSOTokenHeaders,
        },
        response: getCustomerSSOToken.data,
        code: getCustomerSSOToken.status,
      });

      customerSSOToken = getCustomerSSOToken.data.customerSSOToken;
    } else {
      await dbLoggerServices.log({
        fintechId,
        customerId,
        action: voltmoneyConstants.redirect.action.GENERATE_SSO_TOKEN,
        request: {
          getCustomerSSOTokenUrl,
          headers: getCustomerSSOTokenHeaders,
        },
        response: getCustomerSSOToken.message,
        code: getCustomerSSOToken.status,
      });

      return sharedServices.error.throw(
        voltmoneyConstants.redirect.errorMessages.FVME0004
      );
    }

    sharedServices.loggerServices.success.info({
      requestId,
      stage: "Voltmoney redirect - Request successfull",
      msg: "Request fulfilled and successfully generated response data for new customer",
      voltPlatformCode: sharedConstants.masterConstants.PLATFORM_CODE.CENTRUM,
      customerSSOToken,
      voltmoneyCustomerId,
    });

    // return params required for sdk initialization
    return {
      voltPlatformCode: sharedConstants.masterConstants.PLATFORM_CODE.CENTRUM,
      customerSsoToken: customerSSOToken,
      customerCode: voltmoneyCustomerId,
      authToken: authKey,
    };
  }

  // Existing customer
  if (customerLinked.length) {
    const { fintechCustomerId } = customerLinked[0];

    sharedServices.loggerServices.success.info({
      requestId,
      stage: "Voltmoney redirect - Customer already exists",
      msg: "Existing customer",
      customerId,
      fintechId,
      fintechCustomerId,
    });

    // get customer SSO token ---
    const getCustomerSSOTokenConfig = fintechConfig.filter(
      (e) =>
        e.apiName == voltmoneyConstants.redirect.apiName.getCustomerSSOToken
    );

    const { apiEndpoint: getCustomerSSOTokenApi } =
      getCustomerSSOTokenConfig[0];

    const getCustomerSSOTokenRequestId =
      sharedServices.mysqlHelperServices.generateRefID(
        voltmoneyConstants.redirect.apiName.getCustomerSSOToken,
        sharedConstants.masterConstants.FINTECH.VOLTMONEY
      );
    const getCustomerSSOTokenUrl = getCustomerSSOTokenApi + fintechCustomerId;
    const getCustomerSSOTokenHeaders = {
      "X-AppPlatform": sharedConstants.masterConstants.PLATFORM_CODE.CENTRUM,
      requestReferenceId: getCustomerSSOTokenRequestId,
      Authorization: `Bearer ${authKey}`,
    };
    let customerSSOToken;

    const getCustomerSSOToken = await axios.get(getCustomerSSOTokenUrl, {
      headers: getCustomerSSOTokenHeaders,
    });

    if (getCustomerSSOToken.status == 200) {
      await dbLoggerServices.log({
        fintechId,
        customerId,
        action: voltmoneyConstants.redirect.action.GENERATE_SSO_TOKEN,
        request: {
          getCustomerSSOTokenUrl,
          headers: getCustomerSSOTokenHeaders,
        },
        response: getCustomerSSOToken.data,
        code: getCustomerSSOToken.status,
      });

      customerSSOToken = getCustomerSSOToken.data.customerSSOToken;
    } else {
      await dbLoggerServices.log({
        fintechId,
        customerId,
        action: voltmoneyConstants.redirect.action.GENERATE_SSO_TOKEN,
        request: {
          getCustomerSSOTokenUrl,
          headers: getCustomerSSOTokenHeaders,
        },
        response: getCustomerSSOToken.message,
        code: getCustomerSSOToken.status,
      });

      return sharedServices.error.throw(
        voltmoneyConstants.redirect.errorMessages.FVME0004
      );
    }

    sharedServices.loggerServices.success.info({
      requestId,
      stage: "Voltmoney redirect - Request successfull",
      msg: "Request fulfilled and successfully generated response data for existing customer",
      voltPlatformCode: sharedConstants.masterConstants.PLATFORM_CODE.CENTRUM,
      customerSSOToken,
      fintechCustomerId,
    });

    return {
      voltPlatformCode: sharedConstants.masterConstants.PLATFORM_CODE.CENTRUM,
      customerSsoToken: customerSSOToken,
      customerCode: fintechCustomerId,
      authToken: authKey,
    };
  }
};
