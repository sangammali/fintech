const sharedServices = require("shared/services");
const sharedValidators = require("shared/validators");
const stockalConstants = require("../constants");

module.exports = (req) => {
  const { planid } = req.headers;
  const { customerRefId, customerId } = req;

  if (sharedValidators.isRequired(customerRefId)) {
    sharedServices.error.throw(
      stockalConstants.redirect.errorMessages.FSAE0001
    );
  }

  if (sharedValidators.isRequired(customerId)) {
    sharedServices.error.throw(
      stockalConstants.redirect.errorMessages.FSAE0008
    );
  }

  if (sharedValidators.isRequired(planid)) {
    sharedServices.error.throw(
      stockalConstants.redirect.errorMessages.FSAE0007
    );
  }

  return {
    customerRefId,
    customerId,
    planid,
  };
};
