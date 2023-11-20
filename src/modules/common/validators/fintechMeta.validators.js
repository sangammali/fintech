const sharedServices = require("shared/services");
const sharedValidators = require("shared/validators");
const commonModuleConstants = require("../constants");
const sharedConstants = require("shared/constants");

module.exports = (req) => {
  const { fintechName, product } = req.query;

  if (sharedValidators.isRequired(fintechName)) {
    sharedServices.error.throw(
      commonModuleConstants.fintechMeta.errorMessages.CFME0001
    );
  }

  if (
    fintechName ==
    (sharedConstants.masterConstants.FINTECH.JARVIS ||
      sharedConstants.masterConstants.FINTECH.FINBINGO)
  ) {
    if (sharedValidators.isRequired(product)) {
      sharedServices.error.throw(
        commonModuleConstants.fintechMeta.errorMessages.CFME0002
      );
    }
  }

  return {
    fintechName,
    product,
  };
};
