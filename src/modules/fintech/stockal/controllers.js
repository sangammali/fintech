const stockalValidators = require("./validators");
const stockalServices = require("./services");
const stockalConstants = require("./constants");
const sharedConstants = require("shared/constants");

const stockalControllers = {};

// controller_name: redirect
// controller_description:
//      controller used to generate redirection URI to stockal
stockalControllers.redirect = async (req, res, next) => {
  try {
    // validate request
    const validateRequest = stockalValidators.redirect(req);

    // handle logic within service function
    const data = await stockalServices.redirect({
      customerRefId: validateRequest.customerRefId,
      customerId: validateRequest.customerId,
      planId: validateRequest.planid,
      requestId: req.requestId,
    });

    // return response/raise an exception
    next({
      ...stockalConstants.redirect.messages.FSAS0001,
      result: data,
    });
  } catch (error) {
    if (error.code == sharedConstants.masterConstants.BAD_REQUEST) {
      const violations = JSON.parse(error.response.data.violations);
      next({ message: violations, statusCode: 400, code: stockalConstants.redirect.errorMessages.FSAE0009.code });
    } else {
      next(JSON.parse(error));
    }
  }
};

module.exports = stockalControllers;
