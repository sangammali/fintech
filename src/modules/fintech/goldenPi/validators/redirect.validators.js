const sharedServices = require("shared/services");
const sharedValidators = require("shared/validators");
const goldenPiConstants = require("../constants");

module.exports = (req) => {
	const { customerRefId, customerId } = req;

	if (sharedValidators.isRequired(customerRefId)) {
		sharedServices.error.throw(
			goldenPiConstants.redirect.errorMessages.FGPE0001
		);
	}

	if (sharedValidators.isRequired(customerId)) {
		sharedServices.error.throw(
			goldenPiConstants.redirect.errorMessages.FGPE0002
		);
	}

	return {
		customerRefId,
		customerId,
	};
};
