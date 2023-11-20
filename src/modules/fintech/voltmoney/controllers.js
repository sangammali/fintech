const voltmoneyConstants = require("./constants");
const voltmoneyValidators = require("./validators");
const voltmoneyServices = require("./services");
const sharedConstants = require("shared/constants");

const voltmoneyControllers = {};

// controller_name: redirect
// controller_description:
//      controller used to handle redirect of voltmoney module
voltmoneyControllers.redirect = async (req, res, next) => {
  try {
    // validate request/raise an exception
    const validateRequest = voltmoneyValidators.redirect(req);

    // handle logic within service function
    const data = await voltmoneyServices.redirect({
      customerRefId: validateRequest.customerRefId,
      customerId: validateRequest.customerId,
      requestId: req.requestId,
    });

    // return response
    next({
      ...voltmoneyConstants.redirect.messages.FVMS0001,
      result: data,
    });
  } catch (error) {
    // throw error or raise
    if (error.name == voltmoneyConstants.redirect.tokenExpiredError) {
      next({ ...error, statusCode: 400 });
    } else if (error.code == sharedConstants.masterConstants.BAD_REQUEST) {
      const violations = JSON.parse(error.response.data.violations);
      next({ message: violations, statusCode: 400, code: voltmoneyConstants.redirect.errorMessages.FVME0007.code });
    } else {
      next(JSON.parse(error));
    }
  }
};

module.exports = voltmoneyControllers;
