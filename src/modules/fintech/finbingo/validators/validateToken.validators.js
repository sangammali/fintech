const sharedServices = require("shared/services");
const sharedValidators = require("shared/validators");
const finbingoConstants = require("../constants");

module.exports = ({ token }) => {
  if (sharedValidators.isRequired(token)) {
    sharedServices.error.throw(
      finbingoConstants.validateToken.errorMessages.FFBE1001
    );
  }

  return {
    token,
  };
};
