const sharedConstants = require("shared/constants");
const goldenPiConstants = require("../constants");
const sharedServices = require("shared/services");
const sharedModels = require("shared/models");

module.exports = async ({ customerRefId, customerId, requestId }) => {

	sharedServices.loggerServices.success.info({
		requestId,
		stage: "Golden Pi redirect - Request params",
		msg: "Params recieved",
		customerId,
		customerRefId,
	});

	// get goldenPi api config
	const goldenPiConfig = await sharedModels.fintechConfig.read({
		apiName: goldenPiConstants.redirect.apiName.redirectApi,
	});

	let { apiEndpoint, fintechId } = goldenPiConfig[0];

	// generate a jwt token containing customerRefId, customerId and fintechId expire time of +30sec
	const token = sharedServices.authServices.getJWT(
		{
			customerRefId: customerRefId,
			customerId: customerId,
			fintechId: fintechId,
		},
		sharedConstants.appConfig.goldenPi.jwtSecret,
		{ expiresIn: sharedConstants.appConfig.goldenPi.jwtExpiresIn }
	);

	
	// replace constants in url with actual params
	apiEndpoint = apiEndpoint.replace("<AUTH_TOKEN>", token);
	apiEndpoint = apiEndpoint.replace("<PID>", sharedConstants.appConfig.goldenPi.pid);
	
	sharedServices.loggerServices.success.info({
		requestId,
		stage: "Golden Pi redirect - redirection link generation",
		msg: "Generated JWT token for redirection link",
		customerId,
		customerRefId,
		fintechId,
		token,
		redirectionUrl: apiEndpoint
	});

	return {
		redirectionURI: apiEndpoint,
	};
};
