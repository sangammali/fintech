const sharedServices = require("shared/services");
const sharedConstants = require("shared/constants");

const customerConsentModels = {};

// @model-name: create
// @model-desc: create a new customer consent
customerConsentModels.create = async (customerId, fintechId, status) => {
  const result = await new sharedServices.mysqlServices()
    .insert(
      sharedConstants.dbTableNames.customerConsent,
      sharedServices.mysqlHelperServices.parseInsertValues({
        customer_id: customerId,
        fintech_id: fintechId,
        status: status,
      })
    )
    .build();

  return result;
};

// @model-name: read
// @model-desc: read customer consent based on filter
customerConsentModels.read = async (whereParams) => {
  const where = [];

  if (whereParams.customerId) {
    where.push(`customer_id='${whereParams.customerId}'`);
  }

  if (whereParams.fintechId) {
    where.push(`fintech_id='${whereParams.fintechId}'`);
  }

  let result = new sharedServices.mysqlServices()
    .select(
      `
      id AS customerConsentId,
      customer_id AS customerId,
      fintech_id AS fintechId,
      status AS status,
      created_at AS createdAt,
      updated_at AS updatedAt
      `
    )
    .from(sharedConstants.dbTableNames.customerConsent);

  if (where.length) {
    result = result.where(where.join(" AND "));
  }

  result = await result.build();

  return result;
};

// @model-name: update
// @model-desc: update sample based on update and where params
customerConsentModels.update = async (updateParams, whereParams) => {
  const where = [];

  if (whereParams.customerId) {
    where.push(`customer_id='${whereParams.customerId}'`);
  }
  if (whereParams.fintechId) {
    where.push(`fintech_id='${whereParams.fintechId}'`);
  }

  const result = await new sharedServices.mysqlServices()
    .update(
      sharedConstants.dbTableNames.customerConsent,
      sharedServices.mysqlHelperServices.parseUpdateValues({
        customer_id: updateParams.customerId,
        fintech_id: updateParams.fintechId,
        status: updateParams.status,
      })
    )
    .where(where.join(" AND "))
    .build();

  return result;
};

// @model-name: delete
// @model-desc: delete sample based on where params
customerConsentModels.delete = async (whereParams) => {
  const where = [];

  if (whereParams.fintechId) {
    where.push(`fintech_id='${whereParams.fintechId}'`);
  }

  const result = await new sharedServices.mysqlServices()
    .delete(sharedConstants.dbTableNames.customerConsent)
    .where(where.join(" AND "))
    .build();

  return result;
};

module.exports = customerConsentModels;
