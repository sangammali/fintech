const sharedServices = require("shared/services");
const sharedValidators = require("shared/validators");
const commonModuleConstants = require("../constants");

module.exports = (req) => {
  const { userConsentStatus, fintechName } = req.body;
  const { customerRefId, customerId } = req;

  if (sharedValidators.isRequired(fintechName)) {
    sharedServices.error.throw(
      commonModuleConstants.consentStatus.errorMessages.CUSE1001
    );
  }

  if (sharedValidators.isRequired(userConsentStatus)) {
    sharedServices.error.throw(
      commonModuleConstants.consentStatus.errorMessages.CUSE1002
    );
  }

  if (sharedValidators.isRequired(customerRefId)) {
    sharedServices.error.throw(
      commonModuleConstants.consentStatus.errorMessages.CUSE1003
    );
  }

  if (sharedValidators.isRequired(customerId)) {
    sharedServices.error.throw(
      commonModuleConstants.consentStatus.errorMessages.CUSE1005
    );
  }

  return {
    userConsentStatus,
    fintechName,
    customerRefId,
    customerId,
  };
};
