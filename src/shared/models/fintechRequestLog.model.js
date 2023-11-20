const sharedServices = require("shared/services");
const sharedConstants = require("shared/constants");

const fintechRequestLogModels = {};

// @model-name: create
// @model-desc: create a new fintech request log
fintechRequestLogModels.create = async (
  customerRefId,
  customerId,
  fintechName,
  planId,
  moduleName,
  offerCode,
  fintechRequestId,
  fintechRequestExpiry
) => {
  const result = await new sharedServices.mysqlServices()
    .insert(
      sharedConstants.dbTableNames.fintechRequestLog,
      sharedServices.mysqlHelperServices.parseInsertValues({
        customer_ref_id: customerRefId,
        customer_id: customerId,
        fintech_name: fintechName,
        plan_id: planId,
        module_name: moduleName,
        offer_code: offerCode,
        fintech_request_id: fintechRequestId,
        fintech_request_expiry: fintechRequestExpiry,
      })
    )
    .build();

  return result;
};

// @model-name: read
// @model-desc: read fintech request log based on filter
fintechRequestLogModels.read = async (whereParams) => {
  const where = [];

  if (whereParams.fintechRequestId) {
    where.push(`fintech_request_id='${whereParams.fintechRequestId}'`);
  }

  if (whereParams.currentDateTime) {
    where.push(`fintech_request_expiry > '${whereParams.currentDateTime}'`);
  }

  let result = new sharedServices.mysqlServices()
    .select(
      `
      id AS fintechRequestLogId,
      customer_ref_id AS customerRefId,
      customer_id AS customerId,
      fintech_name AS fintechName,
      plan_id AS planId,
      module_name AS moduleName,
      offer_code AS offerCode,
      fintech_request_id AS fintechRequestId,
      fintech_request_expiry AS fintechRequestExpiry,
      created_at AS createdAt,
      updated_at AS updatedAt
      `
    )
    .from(sharedConstants.dbTableNames.fintechRequestLog);

  if (where.length) {
    result = result.where(where.join(" AND "));
  }

  result = await result.build();

  return result;
};

// @model-name: update
// @model-desc: update fintech request log based on update and where params
fintechRequestLogModels.update = async (updateParams, whereParams) => {
  const where = [];

  if (whereParams.fintechRequestId) {
    where.push(`fintech_request_id='${whereParams.fintechRequestId}'`);
  }

  const result = await new sharedServices.mysqlServices()
    .update(
      sharedConstants.dbTableNames.fintechRequestLog,
      sharedServices.mysqlHelperServices.parseUpdateValues({
        fintech_request_expiry: updateParams.fintechRequestExpiry,
      })
    )
    .where(where.join(" AND "))
    .build();

  return result;
};

module.exports = fintechRequestLogModels;
