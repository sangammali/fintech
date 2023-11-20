const redirectService = require("./redirect.service");
const validateTokenService = require("./validateToken.service");

const finbingoServices = {
	redirect: redirectService,
	validateToken: validateTokenService,
};

module.exports = finbingoServices;
