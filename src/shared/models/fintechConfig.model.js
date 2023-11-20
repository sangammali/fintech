const sharedServices = require("shared/services");
const sharedConstants = require("shared/constants");

const fintechConfigModels = {};

// @model-name: create
// @model-desc: create a new fintech config
fintechConfigModels.create = async (fintechId, apiName, apiEndpoint) => {
  const result = await new sharedServices.mysqlServices()
    .insert(
      sharedConstants.dbTableNames.fintechConfig,
      sharedServices.mysqlHelperServices.parseInsertValues({
        fintech_id: fintechId,
        api_name: apiName,
        api_endpoint: apiEndpoint,
      })
    )
    .build();

  return result;
};

// @model-name: read
// @model-desc: read sample based on fintech config
fintechConfigModels.read = async (whereParams) => {
  const where = [];

  if (whereParams.fintechId) {
    where.push(`fintech_id='${whereParams.fintechId}'`);
  }

  if (whereParams.apiName) {
    where.push(`api_name='${whereParams.apiName}'`);
  }

  let result = new sharedServices.mysqlServices()
    .select(
      `
      id AS fintechConfigId,
      fintech_id AS fintechId,
      api_name AS apiName,
      api_method AS apiMethod,
      api_endpoint AS apiEndpoint,
      created_at AS createdAt,
      updated_at AS updatedAt
      `
    )
    .from(sharedConstants.dbTableNames.fintechConfig);

  if (where.length) {
    result = result.where(where.join(" AND "));
  }

  result = await result.build();

  return result;
};

// @model-name: update
// @model-desc: update fintech config based on update and where params
fintechConfigModels.update = async (updateParams, whereParams) => {
  const where = [];

  if (whereParams.fintechId) {
    where.push(`fintech_id='${whereParams.fintechId}'`);
  }
  if (whereParams.apiName) {
    where.push(`api_name='${whereParams.apiName}'`);
  }

  const result = await new sharedServices.mysqlServices()
    .update(
      sharedConstants.dbTableNames.fintechConfig,
      sharedServices.mysqlHelperServices.parseUpdateValues({
        fintech_id: updateParams.fintechId,
        api_name: updateParams.apiName,
        api_method: updateParams.apiMethod,
        api_endpoint: updateParams.apiEndpoint,
      })
    )
    .where(where.join(" AND "))
    .build();

  return result;
};

// @model-name: delete
// @model-desc: delete fintech config based on where params
fintechConfigModels.delete = async (whereParams) => {
  const where = [];

  if (whereParams.fintechId) {
    where.push(`fintech_id='${whereParams.fintechId}'`);
  }

  const result = await new sharedServices.mysqlServices()
    .delete(sharedConstants.dbTableNames.fintechConfig)
    .where(where.join(" AND "))
    .build();

  return result;
};

module.exports = fintechConfigModels;
