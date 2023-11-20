const sharedConstants = require("shared/constants");
const jarvisConstants = require("./constants");
const jarvisServices = require("./services");
const jarvisValidators = require("./validators");
const jarvisControllers = {};

// controller_name: redirect
// controller_description:
//      controller used to redirect user
jarvisControllers.redirect = async (req, res, next) => {
  try {
    // validate params
    const validateParams = jarvisValidators.redirect(req);

    // handle logic within service function
    const data = await jarvisServices.redirect({
      token: validateParams.authorization,
      customerRefId: validateParams.customerRefId,
      customerId: validateParams.customerId,
      moduleName: validateParams.modulename,
      offerCode: validateParams.offercode,
      requestId: req.requestId,
    });

    // return response/raise an exception
    next({
      ...jarvisConstants.redirect.messages.FJS0001,
      result: data,
    });
  } catch (error) {
    if (
      error.name == jarvisConstants.redirect.jwtError.invalidSignature ||
      error.name == jarvisConstants.redirect.jwtError.tokenExpired
    ) {
      next({ statusCode: 400, message: error.message });
    } else {
      next(JSON.parse(error.message));
    }
  }
};

// controller_name: validateToken
// controller_description:
//      controller used to validate token and provide user details
jarvisControllers.validateToken = async (req, res, next) => {
  try {
    const validateParams = jarvisValidators.validateToken(req.headers);

    // handle logic within service function
    const data = await jarvisServices.validateToken({
      token: validateParams.token,
      requestId: req.requestId,
    });

    // return response/raise an exception
    next({
      ...jarvisConstants.validateToken.messages.FJS1001,
      data: data,
    });
  } catch (error) {
    let data = {
      centrumCustomerRefId: "",
      fullName: "",
      email: "",
      mobile: "",
      pan: "",
      dob: "",
      RedirectionURLPostUserJourneyCompletion:
        sharedConstants.appConfig.jarvis.redirectionAfterJournetCompletion,
    };
    next({
      ...jarvisConstants.validateToken.errorMessages.FJE1003,
      data: [data],
    });
  }
};

module.exports = jarvisControllers;
