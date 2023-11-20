const sharedServices = require("shared/services");
const sharedModels = require("shared/models");
const commonConstants = require("../constants");

module.exports = async ({ fintechName, product = "NA" }) => {

  const fintech = await sharedModels.fintech.read({ fintechName });

  // Check for valid fintech name
  if (!fintech.length) {
    sharedServices.error.throw(commonConstants.fintechMeta.errorMessages.CFME0003);
  }

  // Get meta data for product of fintech
  const fintechMetaData = await sharedModels.fintechMeta.read({ fintechName, product });

  // Throw error if meta data not found
  if (!fintechMetaData.length) {
    sharedServices.error.throw(commonConstants.fintechMeta.errorMessages.CFME0004);
  }

  return fintechMetaData[0];
}