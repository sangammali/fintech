const sharedServices = require("shared/services");
const sharedValidators = require("shared/validators");
const sharedConstants = require("shared/constants");
const clientConstants = require("../constants");

module.exports = (req) => {
  const { customerRefId, customerId } = req;
  const {
    fintechName,
    planId = "",
    moduleName = "",
    offerCode = "",
  } = req.body;

  if (sharedValidators.isRequired(customerRefId)) {
    sharedServices.error.throw(
      clientConstants.generateAuthKey.errorMessages.CGAE0001
    );
  }

  if (sharedValidators.isRequired(customerId)) {
    sharedServices.error.throw(
      clientConstants.generateAuthKey.errorMessages.CGAE0002
    );
  }

  if (sharedValidators.isRequired(fintechName)) {
    sharedServices.error.throw(
      clientConstants.generateAuthKey.errorMessages.CGAE0003
    );
  }

  if (
    fintechName == sharedConstants.masterConstants.FINTECH.STOCKAL &&
    sharedValidators.isEmpty(planId)
  ) {
    sharedServices.error.throw(
      clientConstants.generateAuthKey.errorMessages.CGAE0004
    );
  }

  if (
    fintechName == sharedConstants.masterConstants.FINTECH.JARVIS &&
    sharedValidators.isEmpty(moduleName)
  ) {
    sharedServices.error.throw(
      clientConstants.generateAuthKey.errorMessages.CGAE0005
    );
  }

  return {
    customerRefId,
    customerId,
    fintechName,
    planId,
    moduleName,
    offerCode,
  };
};
