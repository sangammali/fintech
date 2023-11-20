const fintechCustomerLinkingModel = require("./fintechCustomerLinking.model");
const fintechConfigModels = require("./fintechConfig.model");
const fintechModels = require("./fintech.model");
const customerConsentModels = require("./customerConsent.models");
const fintechRequestLogModels = require("./fintechRequestLog.model");
const logModels = require("./log.model");
const fintechMetaModels = require("./fintechMeta.models")
const customerFintechDetailsModels = require("./customerFintechDetails.models");

const sharedModels = {
  fintechCustomerLinking: fintechCustomerLinkingModel,
  fintechConfig: fintechConfigModels,
  fintech: fintechModels,
  customerConsent: customerConsentModels,
  fintechRequestLog: fintechRequestLogModels,
  log: logModels,
  fintechMeta: fintechMetaModels,
  customerFintechDetails: customerFintechDetailsModels,
};

module.exports = sharedModels;
