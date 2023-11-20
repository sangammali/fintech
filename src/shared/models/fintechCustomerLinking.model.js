const sharedServices = require("shared/services");
const sharedConstants = require("shared/constants");

const fintechCustomerLinkingModel = {};

// @model-name: create
// @model-desc: create a new fintech customer linking
fintechCustomerLinkingModel.create = async (
  fintechId,
  customerId,
  fintechCustomerId,
  moduleName
) => {
  const result = await new sharedServices.mysqlServices()
    .insert(
      sharedConstants.dbTableNames.fintechCustomerLinking,
      sharedServices.mysqlHelperServices.parseInsertValues({
        fintech_id: fintechId,
        customer_id: customerId,
        fintech_customer_id: fintechCustomerId,
        module_name: moduleName,
      })
    )
    .build();

  return result;
};

// @model-name: read
// @model-desc: read fintech_customer_linking based on filter
fintechCustomerLinkingModel.read = async (whereParams) => {
  const where = [];

  if (whereParams.fintechId) {
    where.push(`fintech_id='${whereParams.fintechId}'`);
  }

  if (whereParams.customerId) {
    where.push(`customer_id='${whereParams.customerId}'`);
  }

  if (whereParams.moduleName) {
    where.push(`module_name='${whereParams.moduleName}'`);
  }

  let result = new sharedServices.mysqlServices()
    .select(
      `
            id AS fintechCustomerLinkingId,
            fintech_id AS fintechId,
            customer_id AS customerId,
            fintech_customer_id AS fintechCustomerId,
            module_name AS moduleName,
            last_access_date AS lastAccessDate,
            created_at AS createdAt,
            updated_at AS updatedAt
            `
    )
    .from(sharedConstants.dbTableNames.fintechCustomerLinking);

  if (where.length) {
    result = result.where(where.join(" AND "));
  }

  result = await result.build();

  return result;
};

// @model-name: update
// @model-desc: update fintech_customer_linking based on update and where params
fintechCustomerLinkingModel.update = async (updateParams, whereParams) => {
  const where = [];

  if (whereParams.fintechId) {
    where.push(`fintech_id='${whereParams.fintechId}'`);
  }
  if (whereParams.email) {
    where.push(`customer_id='${whereParams.customerId}'`);
  }

  const result = await new sharedServices.mysqlServices()
    .update(
      sharedConstants.dbTableNames.fintechCustomerLinking,
      sharedServices.mysqlHelperServices.parseUpdateValues({
        fintech_id: updateParams.fintechId,
        customer_id: updateParams.customerId,
        fintech_customer_id: updateParams.fintechCustomerId,
      })
    )
    .where(where.join(" AND "))
    .build();

  return result;
};

// @model-name: delete
// @model-desc: delete fintech_customer_linking based on where params
fintechCustomerLinkingModel.delete = async (whereParams) => {
  const where = [];

  if (whereParams.fintechId) {
    where.push(`fintech_id='${whereParams.fintechId}'`);
  }

  const result = await new sharedServices.mysqlServices()
    .delete(sharedConstants.dbTableNames.fintechCustomerLinking)
    .where(where.join(" AND "))
    .build();

  return result;
};

module.exports = fintechCustomerLinkingModel;
