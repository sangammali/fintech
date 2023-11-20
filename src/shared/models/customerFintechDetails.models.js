const sharedServices = require("shared/services");
const sharedConstants = require("shared/constants");

const customerFintechDetailsModels = {};

// @model-name: create
// @model-desc: create a new customerFintechDetails
customerFintechDetailsModels.create = async (
  customerId,
  fintechId,
  riskProfiling,
  taxPlanningAnalysis,
  wealthBuilder
) => {
  const result = await new sharedServices.mysqlServices()
    .insert(
      sharedConstants.dbTableNames.customerFintechDetails,
      sharedServices.mysqlHelperServices.parseInsertValues({
        customer_id: customerId,
        fintech_id: fintechId,
        risk_profiling: riskProfiling,
        tax_planning_analysis: taxPlanningAnalysis,
        wealth_builder: wealthBuilder,
      })
    )
    .build();

  return result;
};

// @model-name: read
// @model-desc: read sample based on customerFintechDetails
customerFintechDetailsModels.read = async (whereParams) => {
  const where = [];

  if (whereParams.customerId) {
    where.push(`customer_id='${whereParams.customerId}'`);
  }

  let result = new sharedServices.mysqlServices()
    .select(
      `
      customer_id AS customerId,
      fintech_id AS fintechId,
      risk_profiling AS riskProfiling,
      tax_planning_analysis AS taxPlanningAnalysis,
      wealth_builder AS wealthBuilder,
      created_at AS createdAs,
      updated_at AS updatedAt
      `
    )
    .from(sharedConstants.dbTableNames.customerFintechDetails);

  if (where.length) {
    result = result.where(where.join(" AND "));
  }

  result = await result.build();

  return result;
};

// @model-name: update
// @model-desc: update customerFintechDetails based on update and where params
customerFintechDetailsModels.update = async (updateParams, whereParams) => {
  const where = [];

  if (whereParams.customerId) {
    where.push(`customer_id='${whereParams.customerId}'`);
  }

  if (whereParams.fintechId) {
    where.push(`fintech_id='${whereParams.fintechId}'`);
  }

  const result = await new sharedServices.mysqlServices()
    .update(
      sharedConstants.dbTableNames.customerFintechDetails,
      sharedServices.mysqlHelperServices.parseUpdateValues({
        customer_id: updateParams.customerId,
        fintech_id: updateParams.fintechId,
        risk_profiling: updateParams.riskProfiling,
        tax_planning_analysis: updateParams.taxPlanningAnalysis,
        wealth_builder: updateParams.wealthBuilder,
      })
    )
    .where(where.join(" AND "))
    .build();

  return result;
};

// @model-name: delete
// @model-desc: delete customerFintechDetails based on where params
customerFintechDetailsModels.delete = async (whereParams) => {
  const where = [];

  if (whereParams.customerId) {
    where.push(`customer_id='${whereParams.customerId}'`);
  }

  const result = await new sharedServices.mysqlServices()
    .delete(sharedConstants.dbTableNames.customerFintechDetails)
    .where(where.join(" AND "))
    .build();

  return result;
};

module.exports = customerFintechDetailsModels;
