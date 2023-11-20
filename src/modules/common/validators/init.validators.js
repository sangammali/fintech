const sharedServices = require("shared/services");
const sharedValidators = require("shared/validators");
const commonModuleConstants = require("../constants");

module.exports = (req) => {
  const { authkey } = req.query;

  if (sharedValidators.isRequired(authkey)) {
    sharedServices.error.throw(
      commonModuleConstants.init.errorMessages.CUSE0001
    );
  }

  if (sharedValidators.isEmpty(authkey)) {
    sharedServices.error.throw(
      commonModuleConstants.init.errorMessages.CUSE0002
    );
  }

  return { authkey };
};
