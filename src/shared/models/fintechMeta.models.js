const sharedServices = require("shared/services");
const sharedConstants = require("shared/constants");

const fintechMetaModels = {};

// @model-name: create
// @model-desc: create a new fintech meta
fintechMetaModels.create = async (
  fintechId,
  fintechName,
  header,
  intro,
  features,
  plan
) => {
  const result = await new sharedServices.mysqlServices()
    .insert(
      sharedConstants.dbTableNames.fintechMeta,
      sharedServices.mysqlHelperServices.parseInsertValues({
        fintech_id: fintechId,
        fintech_name: fintechName,
        header: header,
        intro: intro,
        features: features,
        plan: plan
      })
    )
    .build();

  return result;
};

// @model-name: read
// @model-desc: read fintech meta data based on params
fintechMetaModels.read = async (whereParams) => {
  const where = [];

  if (whereParams.fintechId) {
    where.push(`fintech_id='${whereParams.fintechId}'`);
  }

  if (whereParams.fintechName) {
    where.push(`fintech_name='${whereParams.fintechName}'`);
  }

  if (whereParams.product) {
    where.push(`product='${whereParams.product}'`);
  }

  let result = new sharedServices.mysqlServices()
    .select(
      `
      id AS fintechMetaDataId,
      fintech_id AS fintechId,
      fintech_name AS fintechName,
      product AS product,
      header AS header,
      intro AS intro,
      features AS features,
      plan AS plan,
      created_at AS createdAt,
      updated_at AS updatedAt
      `
    )
    .from(sharedConstants.dbTableNames.fintechMeta);

  if (where.length) {
    result = result.where(where.join(" AND "));
  }

  result = await result.build();

  return result;
};

// @model-name: update
// @model-desc: update fintech meta based on update and where params
fintechMetaModels.update = async (updateParams, whereParams) => {
  const where = [];

  if (whereParams.fintechName) {
    where.push(`fintech_name='${whereParams.fintechName}'`);
  }

  if (whereParams.fintechId) {
    where.push(`fintech_id='${whereParams.fintechId}'`);
  }

  const result = await new sharedServices.mysqlServices()
    .update(
      sharedConstants.dbTableNames.fintechMeta,
      sharedServices.mysqlHelperServices.parseUpdateValues({
        header: updateParams.header,
        intro: updateParams.intro,
        features: updateParams.features,
        plan: updateParams.plan,
      })
    )
    .where(where.join(" AND "))
    .build();

  return result;
};

// @model-name: delete
// @model-desc: delete fintech meta based on where params
fintechMetaModels.delete = async (whereParams) => {
  const where = [];

  if (whereParams.fintechId) {
    where.push(`fintech_id='${whereParams.fintechId}'`);
  }

  const result = await new sharedServices.mysqlServices()
    .delete(sharedConstants.dbTableNames.fintechMeta)
    .where(where.join(" AND "))
    .build();

  return result;
};

module.exports = fintechMetaModels;
