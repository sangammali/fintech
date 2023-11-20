const express = require("express");
const voltmoneyRoutes = express.Router();
const sharedMiddlewares = require("shared/middlewares");
const voltmoneyControllers = require("app_modules/fintech/voltmoney/controllers");

// route_name: redirect
// route_path: /fintech/volt-money/redirect
// route_description:
//      route used to generate redirection url for voltmoney
voltmoneyRoutes.get("/redirect", sharedMiddlewares.authMiddleware, voltmoneyControllers.redirect);

module.exports = voltmoneyRoutes;
