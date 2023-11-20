const sharedConstants = require("shared/constants");
const finbingoConstants = require("./constants");
const finbingoServices = require("./services");
const finbingoValidators = require("./validators");
const finbingoControllers = {};

// controller_name: redirect
// controller_description:
//      controller used to redirect user
finbingoControllers.redirect = async (req, res, next) => {
  try {
    // validate params
    const validateParams = finbingoValidators.redirect(req);

    // handle logic within service function
    const data = await finbingoServices.redirect({
      customerRefId: validateParams.customerRefId,
      customerId: validateParams.customerId,
      moduleName: validateParams.modulename,
      requestId: req.requestId
    });

    // return response/raise an exception
    next({
      ...finbingoConstants.redirect.messages.FFBS0001,
      result: data,
    });
  } catch (error) {
    if (
      error.name == finbingoConstants.redirect.jwtError.invalidSignature ||
      error.name == finbingoConstants.redirect.jwtError.tokenExpired
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
finbingoControllers.validateToken = async (req, res, next) => {
  try {
    const validateParams = finbingoValidators.validateToken(req.headers);

    // handle logic within service function
    const data = await finbingoServices.validateToken({
      token: validateParams.token,
      requestId: req.requestId,
    });

    // return response/raise an exception
    next({
      ...finbingoConstants.validateToken.messages.FFBS1001,
      data: data,
    });
  } catch (error) {
    let data = {
      clientId: "",
      firstName: "",
      Lastname: "",
      email: "",
      mobile: "",
      age: "",
      RedirectionURLPostUserJourneyCompletion:
        sharedConstants.appConfig.finbingo.redirectionAfterJournetCompletion,
    };
    next({
      ...finbingoConstants.validateToken.errorMessages.FFBE1003,
      data: [data],
    });
  }
};

// controller_name: webhook
// controller_description:
//      controller used to store webhook response
finbingoControllers.webhook = async (req, res, next) => {
  try {
    const validateParams = finbingoValidators.webhook(req.body[0]);

    // handle logic within service function
    const data = await finbingoServices.webhook({
      clientId: validateParams.clientId,
      userId: validateParams.userId,
      partnerId: validateParams.partnerId,
      moduleName: validateParams.moduleName,
      documentId: validateParams.documentId,
      input: validateParams.documentId,
      output: validateParams.output,
      requestId: req.requestId,
    });

    // return response/raise an exception
    next({
      ...finbingoConstants.webhook.messages.FFBWS0001,
      data: data,
    });
  } catch (error) {
    if (error.response) {
      next({ statusCode: 400, message: error.response.data.message });
    } else {
      next(JSON.parse(error.message));
    }
  }
};

module.exports = finbingoControllers;
