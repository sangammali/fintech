const sharedServices = require("shared/services");
const sharedModels = require("shared/models");
const commonConstants = require("../constants");

module.exports = async ({ customerId, fintechName, moduleName }) => {
  const fintech = await sharedModels.fintech.read({ fintechName });

  // Check for valid fintech name
  if (!fintech.length) {
    sharedServices.error.throw(
      commonConstants.fintechCustomerLinking.errorMessages.CFCLE0003
    );
  }
  // check if customer is already linked with the fintech
  const customerFintechLinking = await sharedModels.fintechCustomerLinking.read(
    {
      customerId,
      fintechId: fintech[0].fintechId,
      moduleName,
    }
  );

  if (customerFintechLinking.length) {
    return customerFintechLinking[0];
  }
};
