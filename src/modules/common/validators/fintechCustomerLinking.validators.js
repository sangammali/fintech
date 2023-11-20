const sharedServices = require("shared/services");
const sharedValidators = require("shared/validators");
const commonModuleConstants = require("../constants");
const sharedConstants = require("shared/constants");

module.exports = (req) => {
  const { fintechName, moduleName } = req.query;

  if (sharedValidators.isRequired(fintechName)) {
    sharedServices.error.throw(
      commonModuleConstants.fintechCustomerLinking.errorMessages.CFCLE0001
    );
  }

  if (
    fintechName ==
    (sharedConstants.masterConstants.FINTECH.JARVIS ||
      sharedConstants.masterConstants.FINTECH.FINBINGO)
  ) {
    if (sharedValidators.isRequired(moduleName)) {
      sharedServices.error.throw(
        commonModuleConstants.fintechCustomerLinking.errorMessages.CFCLE0002
      );
    }
  }

  return {
    fintechName,
    moduleName,
  };
};
