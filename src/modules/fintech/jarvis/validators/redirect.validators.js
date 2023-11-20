const sharedServices = require("shared/services");
const sharedValidators = require("shared/validators");
const jarvisConstants = require("../constants");

module.exports = (req) => {
  const { authorization } = req.headers;
  const { customerRefId, customerId } = req;
  const { modulename, offercode } = req.headers;

  if (sharedValidators.isRequired(customerRefId)) {
    sharedServices.error.throw(jarvisConstants.redirect.errorMessages.FJE0002);
  }

  if (sharedValidators.isRequired(customerId)) {
    sharedServices.error.throw(jarvisConstants.redirect.errorMessages.FJE0005);
  }

  if (sharedValidators.isRequired(modulename)) {
    sharedServices.error.throw(jarvisConstants.redirect.errorMessages.FJE0006);
  }

  if (
    modulename &&
    !jarvisConstants.redirect.moduleName.hasOwnProperty(
      modulename.toUpperCase()
    )
  ) {
    sharedServices.error.throw(jarvisConstants.redirect.errorMessages.FJE0007);
  }

  return {
    authorization,
    customerRefId,
    customerId,
    modulename,
    offercode,
  };
};
