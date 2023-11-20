const initConstants = require("./init.constants");
const consentStatusConstants = require("./consentStatus.constants");
const generateAuthKeyConstants = require("./generateAuthKey.constants");
const fintechMetaConstants = require("./fintechMeta.constants");
const fintechCustomerLinkingConstants = require("./fintechCustomerLinking.constants");

const commonModuleConstants = {
  init: initConstants,
  consentStatus: consentStatusConstants,
  generateAuthKey: generateAuthKeyConstants,
  fintechMeta: fintechMetaConstants,
  fintechCustomerLinking: fintechCustomerLinkingConstants,
};

module.exports = commonModuleConstants;
