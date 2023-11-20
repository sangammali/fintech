const sharedServices = require("shared/services");
const sharedValidators = require("shared/validators");
const finbingoConstants = require("../constants");

module.exports = ({
  clientId,
  userId,
  partnerId,
  moduleName,
  documentId,
  input,
  output,
}) => {
  if (sharedValidators.isRequired(clientId)) {
    sharedServices.error.throw(
      finbingoConstants.webhook.errorMessages.FFBWE0001
    );
  }

  if (sharedValidators.isRequired(moduleName)) {
    sharedServices.error.throw(
      finbingoConstants.webhook.errorMessages.FFBWE0002
    );
  }

  if (
    moduleName &&
    !finbingoConstants.webhook.moduleName.hasOwnProperty(moduleName)
  ) {
    sharedServices.error.throw(
      finbingoConstants.webhook.errorMessages.FFBWE0003
    );
  }

  if (input && !sharedValidators.isEmptyArray(input)) {
    sharedServices.error.throw(
      finbingoConstants.webhook.errorMessages.FFBWE0004
    );
  }

  if (output && !sharedValidators.isEmptyArray(output)) {
    sharedServices.error.throw(
      finbingoConstants.webhook.errorMessages.FFBWE0005
    );
  }

  return {
    clientId,
    userId,
    partnerId,
    moduleName,
    documentId,
    input,
    output,
  };
};
