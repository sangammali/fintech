const redirectValidators = require("./redirect.validators");
const validateTokenValidators = require("./validateToken.validators");
const webhookValidators = require("./webhook.validators");

const redirectModuleValidators = {
  redirect: redirectValidators,
  validateToken: validateTokenValidators,
  webhook: webhookValidators,
};

module.exports = redirectModuleValidators;
