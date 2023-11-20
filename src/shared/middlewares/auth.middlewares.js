const sharedConstants = require("shared/constants");
const sharedServices = require("../services");

const authMiddleware = (req, res, next) => {
  try {
    const unAuthorisedResponse = {
      message: "Your token is expired or invalidate",
      code: "CFI401",
      statusCode: 401,
    };

    if (!req.headers.authorization) {
      sharedServices.error.throw(unAuthorisedResponse);
    }

    token = sharedServices.authServices.validateJWT(
      req.headers.authorization,
      sharedConstants.appConfig.IAM.jwtSecret,
    );

    if (token == null) {
      sharedServices.error.throw(unAuthorisedResponse);
    }

    req.customerRefId = token.customerRefId;
    req.customerId = token.customerId;

    next();
  } catch (error) {
    next({
      message: "Your token is expired or invalidate",
      code: "CFI401",
      statusCode: 401,
    });
  }
};

module.exports = authMiddleware;
