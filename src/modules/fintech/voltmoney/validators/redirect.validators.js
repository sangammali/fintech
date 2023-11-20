const sharedServices = require("shared/services");
const sharedValidators = require("shared/validators");
const voltmoneyConstants = require("../constants");

module.exports = (req) => {
	const { customerRefId, customerId } = req;

	if (sharedValidators.isRequired(customerId)) {
		sharedServices.error.throw(
			voltmoneyConstants.redirect.errorMessages.FVME0005
		);
	}

	if (sharedValidators.isRequired(customerRefId)) {
		sharedServices.error.throw(
			voltmoneyConstants.redirect.errorMessages.FVME0006
		);
	}

	return {
		customerRefId,
		customerId,
	};
};
