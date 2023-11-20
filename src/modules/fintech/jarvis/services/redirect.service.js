const sharedConstants = require("shared/constants");
const jarvisConstants = require("../constants");
const sharedServices = require("shared/services");
const sharedModels = require("shared/models");

module.exports = async ({
  token,
  customerRefId,
  customerId,
  moduleName,
  offerCode,
  requestId,
}) => {
  sharedServices.loggerServices.success.info({
    requestId,
    stage: "Jarvis Redirect - Request params",
    msg: "Request params recieved",
    customerRefId,
    customerId,
  });

  // get jarvis redirect api config
  const jarvisConfig = await sharedModels.fintechConfig.read({
    apiName: jarvisConstants.redirect.apiName.redirectApi,
  });

  sharedServices.loggerServices.success.info({
    requestId,
    stage: "Jarvis Redirect - fintech config",
    msg: "Get jarvis config details",
    ...jarvisConfig[0],
  });

  let { apiEndpoint, fintechId } = jarvisConfig[0];

  // get jarvis - fintech details
  const jarvisDetails = await sharedModels.fintech.read({ fintechId });

  sharedServices.loggerServices.success.info({
    requestId,
    stage: "Jarvis Redirect - fintech details",
    msg: "Get jarvis details",
    ...jarvisDetails[0],
  });

  if (!jarvisDetails.length) {
    sharedServices.loggerServices.error.error({
      requestId,
      stage: "Jarvis Redirect - fintech details not found",
      msg: "Jarvis fintech details not found",
      error: jarvisConstants.redirect.errorMessages.FJE0004,
      fintechId,
    });

    return sharedServices.error.throw(
      jarvisConstants.redirect.errorMessages.FJE0004
    );
  }

  // generate a jwt token containing customerRefId, customerId and fintechId
  const jarvisToken = sharedServices.authServices.getJWT(
    {
      customerRefId: customerRefId,
      customerId: customerId,
      fintechId: fintechId,
      moduleName: moduleName,
    },
    sharedConstants.appConfig.jarvis.jwtSecret,
    { expiresIn: sharedConstants.appConfig.jarvis.jwtExpiresIn }
  );

  sharedServices.loggerServices.success.info({
    requestId,
    stage: "Jarvis Redirect - token created",
    msg: "Created JWT token for jarvis",
    jarvisToken,
  });

  // replace constants in url with actual params
  apiEndpoint = apiEndpoint.replace("<UserIAMToken>", token);
  apiEndpoint = apiEndpoint.replace("<UserAuthToken>", jarvisToken);
  apiEndpoint = apiEndpoint.replace("<ModuleName>", moduleName);
  apiEndpoint = apiEndpoint.replace(
    "<utmSource>",
    jarvisConstants.redirect.utmSource
  );

  apiEndpoint = apiEndpoint.replace("<offerCode>", offerCode);

  sharedServices.loggerServices.success.info({
    requestId,
    stage: "Jarvis Redirect - endpoint generated",
    msg: "Created endpoint for jarvis redirect",
    redirectUrl: apiEndpoint,
  });

  return {
    redirectionURI: apiEndpoint,
  };
};
