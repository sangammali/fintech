const sharedServices = require("shared/services");
const sharedValidators = require("shared/validators");
const goldenPiConstants = require("../constants");

module.exports = ({ token }) => {
	if (sharedValidators.isRequired(token)) {
		sharedServices.error.throw(
			goldenPiConstants.validateToken.errorMessages.FGPE1001
		);
	}

	return {
		token,
	};
};
