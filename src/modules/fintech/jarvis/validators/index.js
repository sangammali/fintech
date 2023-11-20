const redirectValidators = require("./redirect.validators");
const validateTokenValidators = require("./validateToken.validators");

const redirectModuleValidators = {
  redirect: redirectValidators,
  validateToken: validateTokenValidators,
};

module.exports = redirectModuleValidators;
