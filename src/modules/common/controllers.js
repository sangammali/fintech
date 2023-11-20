const commonValidators = require("./validators");
const commonServices = require("./services");
const commonConstants = require("./constants");

const commonModuleControllers = {};

// controller_name: generateAuthKey
// controller_description:
//      controller used to generate auth key for common
commonModuleControllers.generateAuthKey = async (req, res, next) => {
  try {
    // validate request/raise an exception
    const validatedRequest = commonValidators.generateAuthKey(req);

    // handle logic within service function
    const data = await commonServices.generateAuthKey({
      customerRefId: validatedRequest.customerRefId,
      customerId: validatedRequest.customerId,
      fintechName: validatedRequest.fintechName,
      planId: validatedRequest.planId,
      moduleName: validatedRequest.moduleName,
      offerCode: validatedRequest.offerCode,
      requestId: req.requestId,
    });

    // return response/raise an exception
    next({
      ...commonConstants.generateAuthKey.messages.CGAS0001,
      result: data,
    });
  } catch (error) {
    next(JSON.parse(error.message));
  }
};

// controller_name: init
// controller_description:
//      controller used to initialize journey
commonModuleControllers.init = async (req, res, next) => {
  try {
    // validate request/raise an exception
    const validatedRequest = commonValidators.init(req);

    // handle logic within service function
    const data = await commonServices.init({
      authkey: validatedRequest.authkey,
      requestId: req.requestId,
    });

    // return response/raise an exception
    next({
      ...commonConstants.init.messages.CUSS0001,
      result: data,
    });
  } catch (error) {
    next(JSON.parse(error.message));
  }
};

// controller_name: consentStatus
// controller_description:
//      controller used to set consent status
commonModuleControllers.consentStatus = async (req, res, next) => {
  try {
    // validate request/raise an exception
    const validateBody = commonValidators.consentStatus(req);

    // handle logic within service function
    await commonServices.consentStatus({
      fintechName: validateBody.fintechName,
      userConsentStatus: validateBody.userConsentStatus,
      customerRefId: validateBody.customerRefId,
      customerId: validateBody.customerId,
      requestId: req.requestId,
    });
    // return response/raise an exception
    next({
      ...commonConstants.consentStatus.messages.CUSS1001,
      result: null,
    });
  } catch (error) {
    next(JSON.parse(error.message));
  }
};

// controller_name: fintechMetaData
// controller_description:
//      controller used to get fintech meta data
commonModuleControllers.fintechMeta = async (req, res, next) => {
  try {
    // validate request/raise an exception
    const validatedRequest = commonValidators.fintechMeta(req);

    // handle logic within service function
    const data = await commonServices.fintechMeta({
      fintechName: validatedRequest.fintechName,
      product: validatedRequest.product,
    });

    // return response/raise an exception
    next({
      ...commonConstants.fintechMeta.messages.CFMS0001,
      result: data,
    });
  } catch (error) {
    next(JSON.parse(error.message));
  }
};

// controller_name: fintechCustomerLinking
// controller_description:
//      controller used to get fintech customer linking data
commonModuleControllers.fintechCustomerLinking = async (req, res, next) => {
  try {
    // validate request/raise an exception
    const validatedRequest = commonValidators.fintechCustomerLinking(req);

    // handle logic within service function
    const data = await commonServices.fintechCustomerLinking({
      fintechName: validatedRequest.fintechName,
      customerId: req.customerId,
      moduleName: validatedRequest.moduleName,
    });

    // return response/raise an exception
    next({
      ...commonConstants.fintechCustomerLinking.messages.CFCLS0001,
      result: data,
    });
  } catch (error) {
    next(JSON.parse(error.message));
  }
};

module.exports = commonModuleControllers;
