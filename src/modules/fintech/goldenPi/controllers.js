const goldenPiConstants = require("./constants");
const goldenPiServices = require("./services");
const goldenPiValidators = require("./validators");
const goldenPiControllers = {};

// controller_name: redirect
// controller_description:
//      controller used to redirect user
goldenPiControllers.redirect = async (req, res, next) => {
	try {
		// validate params
		const validateParams = goldenPiValidators.redirect(req);

		// handle logic within service function
		const data = await goldenPiServices.redirect({
			customerRefId: validateParams.customerRefId,
			customerId: validateParams.customerId,
			requestId: req.requestId
		});

		// return response/raise an exception
		next({
			...goldenPiConstants.redirect.messages.FGPS0001,
			result: data,
		});
	} catch (error) {
		next(JSON.parse(error.message));
	}
};

// controller_name: validateToken
// controller_description:
//      controller used to validate token and provide user details
goldenPiControllers.validateToken = async (req, res, next) => {
	try {
		const validateParams = goldenPiValidators.validateToken(req.headers);

		// handle logic within service function
		const data = await goldenPiServices.validateToken({
			token: validateParams.token,
			requestId: req.requestId,
		});

		// return response/raise an exception
		next({
			...goldenPiConstants.validateToken.messages.FDPS1001,
			result: data,
		});
	} catch (error) {
		if (
			error.name == goldenPiConstants.validateToken.tokenExpiredError ||
			error.name == goldenPiConstants.validateToken.tokenInvalidError
		) {
			next({
				...error,
				code: goldenPiConstants.validateToken.errorMessages.FGPE1003.code,
				statusCode: 400
			});
		} else {
			next(JSON.parse(error.message));
		}
	}
};


module.exports = goldenPiControllers;
