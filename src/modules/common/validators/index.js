const initValidators = require("./init.validators");
const consentStatusValidators = require("./consentStatus.validators");
const generateAuthKeyValidators = require("./generateAuthKey.validators");
const fintechMetaValidators = require("./fintechMeta.validators");
const fintechCustomerLinkingValidators = require("./fintechCustomerLinking.validators");

const commonModuleValidators = {
  init: initValidators,
  consentStatus: consentStatusValidators,
  generateAuthKey: generateAuthKeyValidators,
  fintechMeta: fintechMetaValidators,
  fintechCustomerLinking: fintechCustomerLinkingValidators,
};

module.exports = commonModuleValidators;
