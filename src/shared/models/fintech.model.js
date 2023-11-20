const sharedServices = require("shared/services");
const sharedConstants = require("shared/constants");

const fintechModels = {};

// @model-name: create
// @model-desc: create a new fintech
fintechModels.create = async (fintechPartnerId, name, appKey, appSecret) => {
  const result = await new sharedServices.mysqlServices()
    .insert(
      sharedConstants.dbTableNames.fintech,
      sharedServices.mysqlHelperServices.parseInsertValues({
        fintech_partner_id: fintechPartnerId,
        name: name,
        app_key: appKey,
        app_secret: appSecret,
      })
    )
    .build();

  return result;
};

// @model-name: read
// @model-desc: read sample based on fintech
fintechModels.read = async (whereParams) => {
  const where = [];

  if (whereParams.fintechId) {
    where.push(`id='${whereParams.fintechId}'`);
  }

  if (whereParams.fintechPartnerId) {
    where.push(`fintech_partner_id='${whereParams.fintechPartnerId}'`);
  }

  if (whereParams.fintechName) {
    where.push(`name='${whereParams.fintechName}'`);
  }

  let result = new sharedServices.mysqlServices()
    .select(
      `
      id AS fintechId,
      fintech_partner_id AS fintechPartnerId,
      name AS fintechName,
      app_key AS appKey,
      app_secret AS appSecret,
      created_at AS createdAt,
      updated_at AS updatedAt
      `
    )
    .from(sharedConstants.dbTableNames.fintech);

  if (where.length) {
    result = result.where(where.join(" AND "));
  }

  result = await result.build();

  return result;
};

// @model-name: update
// @model-desc: update fintech based on update and where params
fintechModels.update = async (updateParams, whereParams) => {
  const where = [];

  if (whereParams.fintechName) {
    where.push(`name='${whereParams.fintechName}'`);
  }
  if (whereParams.fintechPartnerId) {
    where.push(`fintech_partner_id='${whereParams.fintechPartnerId}'`);
  }

  const result = await new sharedServices.mysqlServices()
    .update(
      sharedConstants.dbTableNames.fintech,
      sharedServices.mysqlHelperServices.parseUpdateValues({
        fintech_partner_id: updateParams.fintechPartnerId,
        name: updateParams.fintechName,
        app_key: updateParams.appKey,
        app_secret: updateParams.appSecret,
      })
    )
    .where(where.join(" AND "))
    .build();

  return result;
};

// @model-name: delete
// @model-desc: delete fintech based on where params
fintechModels.delete = async (whereParams) => {
  const where = [];

  if (whereParams.fintechPartnerId) {
    where.push(`fintech_partner_id='${whereParams.fintechPartnerId}'`);
  }

  const result = await new sharedServices.mysqlServices()
    .delete(sharedConstants.dbTableNames.fintech)
    .where(where.join(" AND "))
    .build();

  return result;
};

module.exports = fintechModels;
