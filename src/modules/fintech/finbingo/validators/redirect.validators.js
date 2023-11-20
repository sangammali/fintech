const sharedServices = require("shared/services");
const sharedValidators = require("shared/validators");
const finbingoConstants = require("../constants");

module.exports = (req) => {
	const { customerRefId, customerId } = req;
	const { modulename } = req.headers;

	if (sharedValidators.isRequired(customerRefId)) {
		sharedServices.error.throw(
			finbingoConstants.redirect.errorMessages.FFBE0002
		);
	}

	if (sharedValidators.isRequired(customerId)) {
		sharedServices.error.throw(
			finbingoConstants.redirect.errorMessages.FFBE0005
		);
	}

	if (sharedValidators.isRequired(modulename)) {
		sharedServices.error.throw(
			finbingoConstants.redirect.errorMessages.FFBE0006
		);
	}

	return {
		customerRefId,
		customerId,
		modulename,
	};
};
