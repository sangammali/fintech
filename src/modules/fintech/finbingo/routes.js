const express = require("express");
const redirectionRoutes = express.Router();
const sharedMiddlewares = require("shared/middlewares");
const finbingoControllers = require("app_modules/fintech/finbingo/controllers");

// route_name: redirect
// route_path: /fintech/finbingo/redirect
// route_description:
//      route used for redirect module
redirectionRoutes.get(
  "/redirect",
  sharedMiddlewares.authMiddleware,
  finbingoControllers.redirect
);

// route_name: validate-token
// route_path: /fintech/finbingo/validate-token
// route_description:
//      route used for validate-token module
redirectionRoutes.get("/validate-token", finbingoControllers.validateToken);

// route_name: webhook
// route_path: /fintech/finbingo/webhook
// route_description:
//      route used for webhook module
redirectionRoutes.post("/webhook", finbingoControllers.webhook);

module.exports = redirectionRoutes;
