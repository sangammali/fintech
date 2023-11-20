const sharedServices = require("shared/services");
const sharedValidators = require("shared/validators");
const jarvisConstants = require("../constants");

module.exports = ({ token }) => {
  if (sharedValidators.isRequired(token)) {
    sharedServices.error.throw(
      jarvisConstants.validateToken.errorMessages.FJE1001
    );
  }

  return {
    token,
  };
};
