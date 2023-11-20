const sharedConstants = require("shared/constants");
const finbingoConstants = require("../constants");
const sharedServices = require("shared/services");
const sharedModels = require("shared/models");
const iamServices = require("app_modules/common/services/iam.services");
const dbLoggerServices = require("shared/services/dbLogger.services");

module.exports = async ({
  clientId,
  userId,
  partnerId,
  moduleName,
  documentId,
  input,
  output,
  requestId,
}) => {
  sharedServices.loggerServices.success.info({
    requestId,
    stage: "Finbingo Webhook - Request params",
    msg: "Request params recieved",
    customerRefId: clientId,
  });

  /**dump webhook data into log table */
  await dbLoggerServices.log({
    action: finbingoConstants.webhook.action.WEBHOOK + "_" + moduleName,
    request: JSON.stringify({
      clientId,
      userId,
      partnerId,
      moduleName,
      documentId,
      input,
      output,
    }).replaceAll("'", ""),
  });
  // get customer details
  const customerDetails = await iamServices.getUserDetails(
    clientId,
    finbingoConstants.webhook.requestedData.customerDetails
  );

  if (!customerDetails) {
    sharedServices.loggerServices.error.error({
      requestId,
      stage: "Finbingo Webhook - customer details not found",
      msg: "Finbingo customer details not found",
      error: finbingoConstants.webhook.errorMessages.FFBWE0006,
      customerRefId: clientId,
    });

    sharedServices.error.throw(
      finbingoConstants.webhook.errorMessages.FFBWE0006
    );
  }

  // get finbingo fintechId
  let fintech = await sharedModels.fintech.read({
    name: finbingoConstants.webhook.fintechName,
  });

  sharedServices.loggerServices.success.info({
    requestId,
    stage: "Finbingo Webhook - fintechId",
    msg: "Get finbingo fintechId",
    ...fintech[0],
  });

  let fintechId = fintech[0].fintechId;

  /**based on module name prepare payload */
  let riskProfiling;
  let taxPlanningAnalysis;
  let wealthBuilder;
  if (moduleName == finbingoConstants.webhook.moduleName.RP) {
    riskProfiling = {
      clientId,
      userId,
      partnerId,
      moduleName,
      documentId,
      input,
      output,
    };
  } else if (moduleName == finbingoConstants.webhook.moduleName.TPA) {
    taxPlanningAnalysis = {
      clientId,
      userId,
      partnerId,
      moduleName,
      documentId,
      input,
      output,
    };
  } else if (moduleName == finbingoConstants.webhook.moduleName.WB) {
    wealthBuilder = {
      clientId,
      userId,
      partnerId,
      moduleName,
      documentId,
      input,
      output,
    };
  }

  /** check if already webhook received for customer, if yes then update else creat new entry in customer_fintech_details tbl */
  const customerFintechDetails = await sharedModels.customerFintechDetails.read(
    { customerId: customerDetails.customerId }
  );

  if (customerFintechDetails.length) {
    let updateParams = {};
    if (moduleName == finbingoConstants.webhook.moduleName.RP) {
      updateParams.riskProfiling = JSON.stringify(riskProfiling).replaceAll(
        "'",
        ""
      );
    } else if (moduleName == finbingoConstants.webhook.moduleName.TPA) {
      updateParams.taxPlanningAnalysis = JSON.stringify(
        taxPlanningAnalysis
      ).replaceAll("'", "");
    } else if (moduleName == finbingoConstants.webhook.moduleName.WB) {
      updateParams.wealthBuilder = JSON.stringify(wealthBuilder).replaceAll(
        "'",
        ""
      );
    }

    /**update webhook data into customer_fintech_details table */
    await sharedModels.customerFintechDetails.update(updateParams, {
      customerId: customerDetails.customerId,
      fintechId,
    });
  } else {
    /**insert webhook data into customer_fintech_details table */
    await sharedModels.customerFintechDetails.create(
      customerDetails.customerId,
      fintechId,
      riskProfiling,
      taxPlanningAnalysis,
      wealthBuilder
    );
  }

  sharedServices.loggerServices.success.info({
    requestId,
    stage: "Finbingo Webhook - insert data into customer_fintech_details",
    msg: "insert data into customer_fintech_details",
    customerRefId: clientId,
    fintechId,
    riskProfiling,
    taxPlanningAnalysis,
    wealthBuilder,
  });

  return {
    clientId: clientId,
    webhookDateTime: new Date(),
  };
};
