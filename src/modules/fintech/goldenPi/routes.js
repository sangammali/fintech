const express = require("express");
const redirectionRoutes = express.Router();
const sharedMiddlewares = require("shared/middlewares");
const goldenPiControllers = require("app_modules/fintech/goldenPi/controllers");


// route_name: redirect
// route_path: /fintech/goldenPi/redirect
// route_description:
//      route used for redirect module
redirectionRoutes.get("/redirect", sharedMiddlewares.authMiddleware, goldenPiControllers.redirect);

// route_name: validate-token
// route_path: /fintech/goldenPi/validate-token
// route_description:
//      route used for validate-token module
redirectionRoutes.get("/validate-token", goldenPiControllers.validateToken);

module.exports = redirectionRoutes;
