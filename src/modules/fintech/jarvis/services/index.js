const redirectService = require("./redirect.service");
const validateTokenService = require("./validateToken.service");

const jarvisServices = {
  redirect: redirectService,
  validateToken: validateTokenService,
};

module.exports = jarvisServices;
