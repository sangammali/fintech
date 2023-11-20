const redirectConstants = require("./redirect.constants");
const validateTokenConstants = require("./validateToken.constants");
const webhookConstants = require("./webhook.constants");

const finbingoModuleConstants = {
  redirect: redirectConstants,
  validateToken: validateTokenConstants,
  webhook: webhookConstants,
};

module.exports = finbingoModuleConstants;
