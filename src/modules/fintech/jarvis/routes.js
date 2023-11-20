const express = require("express");
const redirectionRoutes = express.Router();
const sharedMiddlewares = require("shared/middlewares");
const jarvisControllers = require("app_modules/fintech/jarvis/controllers");

// route_name: redirect
// route_path: /fintech/jarvis/redirect
// route_description:
//      route used for redirect module
redirectionRoutes.get(
  "/redirect",
  sharedMiddlewares.authMiddleware,
  jarvisControllers.redirect
);

// route_name: validate-token
// route_path: /fintech/jarvis/validate-token
// route_description:
//      route used for validate-token module
redirectionRoutes.get("/validate-token", jarvisControllers.validateToken);

module.exports = redirectionRoutes;
