const sharedServices = require("shared/services");
const sharedConstants = require("shared/constants");

const logModels = {};

// @model-name: create
// @model-desc: create a new log
logModels.create = async (
  fintechId,
  customerId,
  action,
  request,
  response,
  code
) => {
  const result = await new sharedServices.mysqlServices()
    .insert(
      sharedConstants.dbTableNames.log,
      sharedServices.mysqlHelperServices.parseInsertValues({
        fintech_id: fintechId,
        customer_id: customerId,
        action: action,
        request: request,
        response: response,
        code: code
      })
    )
    .build();

  return result;
};

module.exports = logModels;
