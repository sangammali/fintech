const redirectService = require("./redirect.service");
const validateTokenService = require("./validateToken.service");
const webhookService = require("./webhook.service");

const finbingoServices = {
  redirect: redirectService,
  validateToken: validateTokenService,
  webhook: webhookService,
};

module.exports = finbingoServices;
