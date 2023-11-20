const sharedServices = require("shared/services");
const sharedModels = require("shared/models");
const sharedConstants = require("shared/constants");
const commonConstants = require("../constants");

module.exports = async ({ fintechName, userConsentStatus, customerRefId, customerId, requestId }) => {

  sharedServices.loggerServices.success.info({
    requestId,
    stage: "Mark consent - Initial log",
    msg: "Request params",
    fintechName,
    customerConsentStatus: userConsentStatus,
    customerRefId,
    customerId,
  });

  // validate userConsentStatus
  if (
    userConsentStatus == null ||
    userConsentStatus == "" ||
    (userConsentStatus !==
      commonConstants.consentStatus.consentStatus.APPROVED &&
      userConsentStatus !==
      commonConstants.consentStatus.consentStatus.REJECTED)
  ) {
    sharedServices.loggerServices.error.error({
      requestId,
      stage: "Mark consent - consent validation",
      msg: "Invalid consent status recieved",
      customerConsentStatus: userConsentStatus,
      customerId,
      customerRefId,
      error: commonConstants.consentStatus.errorMessages.CUSE1004
    });

    sharedServices.error.throw(
      commonConstants.consentStatus.errorMessages.CUSE1004
    );
  }

  // get fintech id based on the fintech name
  const fintechDetails = await sharedModels.fintech.read({ fintechName });
  const { fintechId } = fintechDetails[0];

  sharedServices.loggerServices.success.info({
    requestId,
    stage: "Mark consent - got fintech details",
    msg: "Fetched fintech details",
    ...fintechDetails[0]
  });

  // find in customer_consent status for customerId and fintechId
  const commonConsent = await sharedModels.customerConsent.read({
    customerId,
    fintechId,
  });

  sharedServices.loggerServices.success.info({
    requestId,
    stage: "Mark consent - got common consent details",
    msg: "Fetched common consent details",
    ...commonConsent[0]
  })

  // if no record in common consent then create entry in customer_consent
  if (!commonConsent.length) {
    sharedServices.loggerServices.success.info({
      requestId,
      stage: "Mark consent - Mark consent of customer",
      msg: "Marking consent of customer",
      customerId,
      fintechId,
      customerConsentStatus: userConsentStatus,
    });

    await sharedModels.customerConsent.create(
      customerId,
      fintechId,
      userConsentStatus
    );
  }

  // if record exists then update status
  if (commonConsent[0]) {
    
    await sharedModels.customerConsent.update(
      { status: userConsentStatus },
      { customerId, fintechId }
    );

    sharedServices.loggerServices.success.info({
      requestId,
      stage: "Mark consent - Update consent of customer",
      msg: "Updated consent of customer",
      customerId,
      fintechId,
      customerConsentStatus: userConsentStatus,
    });
  }

  return;
};
