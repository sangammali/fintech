const sharedConstants = require("shared/constants");
const finbingoConstants = require("../constants");
const sharedServices = require("shared/services");
const sharedModels = require("shared/models");

module.exports = async ({
  customerRefId,
  customerId,
  moduleName,
  requestId,
}) => {
  sharedServices.loggerServices.success.info({
    requestId,
    stage: "Finbingo Redirect - Request params",
    msg: "Request params recieved",
    customerRefId,
    customerId,
  });

  // get finbingo redirect api config
  const finbingoConfig = await sharedModels.fintechConfig.read({
    apiName: finbingoConstants.redirect.apiName.redirectApi,
  });

  sharedServices.loggerServices.success.info({
    requestId,
    stage: "Finbingo Redirect - fintech config",
    msg: "Get finbingo config details",
    ...finbingoConfig[0],
  });

  let { apiEndpoint, fintechId } = finbingoConfig[0];

  // get finbingo - fintech details
  const finbingoDetails = await sharedModels.fintech.read({ fintechId });

  sharedServices.loggerServices.success.info({
    requestId,
    stage: "Finbingo Redirect - fintech details",
    msg: "Get finbingo details",
    ...finbingoDetails[0],
  });

  if (!finbingoDetails.length) {
    sharedServices.loggerServices.error.error({
      requestId,
      stage: "Finbingo Redirect - fintech details not found",
      msg: "Finbingo fintech details not found",
      error: finbingoConstants.redirect.errorMessages.FFBE0004,
      fintechId,
    });

    return sharedServices.error.throw(
      finbingoConstants.redirect.errorMessages.FFBE0004
    );
  }
  const { fintechPartnerId } = finbingoDetails[0];

  // generate a jwt token containing customerRefId, customerId and fintechId expire time of +30sec
  const finbingoToken = sharedServices.authServices.getJWT(
    {
      customerRefId: customerRefId,
      customerId: customerId,
      fintechId: fintechId,
      moduleName: moduleName,
    },
    sharedConstants.appConfig.finbingo.jwtSecret,
    { expiresIn: sharedConstants.appConfig.finbingo.jwtExpiresIn }
  );

  sharedServices.loggerServices.success.info({
    requestId,
    stage: "Finbingo Redirect - token created",
    msg: "Created JWT token for finbingo",
    finbingoToken,
  });

  // replace constants in url with actual params
  apiEndpoint = apiEndpoint.replace("<PartnerUserAuthToken>", finbingoToken);
  apiEndpoint = apiEndpoint.replace("<PartnerModuleName>", moduleName);
  apiEndpoint = apiEndpoint.replace("<PartnerPartnerID>", fintechPartnerId);

  sharedServices.loggerServices.success.info({
    requestId,
    stage: "Finbingo Redirect - endpoint generated",
    msg: "Created endpoint for finbingo redirect",
    redirectUrl: apiEndpoint,
  });

  return {
    redirectionURI: apiEndpoint,
  };
};
