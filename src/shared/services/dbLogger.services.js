const logModels = require("shared/models/log.model");

const dbLogger = {};

dbLogger.log = async ({
  fintechId,
  customerId,
  action,
  request,
  response,
  code
}
) => {

  // Create a log in database
  await logModels.create(
    fintechId,
    customerId,
    action,
    request,
    response,
    code
  );
}

module.exports = dbLogger;
