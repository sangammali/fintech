const initService = require("./init.service");
const consentStatusService = require("./consentStatus.service");
const generateAuthKeyService = require("./generateAuthKey.service");
const fintechMetaService = require("./fintechMeta.service");
const fintechCustomerLinkingService = require("./fintechCustomerLinking.service");

const commonModuleServices = {
  init: initService,
  consentStatus: consentStatusService,
  generateAuthKey: generateAuthKeyService,
  fintechMeta: fintechMetaService,
  fintechCustomerLinking: fintechCustomerLinkingService,
};

module.exports = commonModuleServices;
