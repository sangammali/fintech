const sharedServices = require("shared/services");
const sharedModels = require("shared/models");
const sharedConstants = require("shared/constants");
const commonConstants = require("../constants");

module.exports = async ({ authkey, requestId }) => {
  let currentDateTime = new Date();

  // Add 5.30 hrs to date-time to convert to IST
  currentDateTime.setHours(
    currentDateTime.getHours() + 5,
    currentDateTime.getMinutes() + 30
  );

  currentDateTime = currentDateTime.toISOString();
  currentDateTime = currentDateTime.split(".")[0];
  currentDateTime = currentDateTime.replaceAll("T", " ");

  // validate auth key
  const fintechRequestLogDetails = await sharedModels.fintechRequestLog.read({
    fintechRequestId: authkey,
    currentDateTime,
  });

  sharedServices.loggerServices.success.info({
    requestId: requestId,
    stage: "Journey init - auth key validation",
    msg: "Validate the auth key and get fintech request logs",
    authkey,
    ...fintechRequestLogDetails[0],
  });

  if (!fintechRequestLogDetails.length) {
    sharedServices.loggerServices.error.error({
      requestId: requestId,
      stage: "Journey init - fintech logs",
      msg: "Auth key expired or Fintech logs not found",
      error: commonConstants.init.errorMessages.CUSE0002,
    });

    return sharedServices.error.throw(
      commonConstants.init.errorMessages.CUSE0002
    );
  }

  const { fintechName, customerRefId, customerId, planId, moduleName } =
    fintechRequestLogDetails[0];

  // get fintech id based on the fintech name
  const fintechDetails = await sharedModels.fintech.read({ fintechName });
  const { fintechId } = fintechDetails[0];

  sharedServices.loggerServices.success.info({
    requestId: requestId,
    stage: "Journey init - Fintech details",
    msg: "Got fintech details",
    ...fintechDetails[0],
  });

  // find in customer_consent status for customerId and fintechId
  const customerConsent = await sharedModels.customerConsent.read({
    customerId,
    fintechId,
  });

  sharedServices.loggerServices.success.info({
    requestId: requestId,
    stage: "Journey init - Consent Status",
    msg: "Got Consent Status",
    consentStatus: customerConsent.length ? customerConsent[0].status : null,
    customerId,
    customerRefId,
    fintechId,
  });

  let userConsentStatus = null;

  // if status is rejected then return false
  if (
    customerConsent.length &&
    customerConsent[0].status == commonConstants.init.consentStatus.REJECTED
  ) {
    userConsentStatus = false;
  }

  // if status is approved then return true
  if (
    customerConsent.length &&
    customerConsent[0].status == commonConstants.init.consentStatus.APPROVED
  ) {
    userConsentStatus = true;
  }

  // generate JWT with customer ref id and customer id
  const jwtToken = sharedServices.authServices.getJWT(
    { customerRefId, customerId },
    sharedConstants.appConfig.IAM.jwtSecret,
    { expiresIn: sharedConstants.appConfig.IAM.tokenExpiryTime }
  );

  sharedServices.loggerServices.success.info({
    requestId: requestId,
    stage: "Journey init - Generate JWT token",
    msg: "Got customer consent status and generated jwt token",
    customerConsentStatus: userConsentStatus,
    customerId,
    customerRefId,
    fintechId,
    fintechName,
    planId,
    moduleName,
    jwtToken,
  });

  return {
    userConsentStatus: userConsentStatus,
    token: jwtToken,
    fintech: fintechName,
    planId: planId,
    moduleName: moduleName,
  };
};
