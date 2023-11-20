const express = require("express");
const stockalRoutes = express.Router();
const sharedMiddlewares = require("shared/middlewares");
const stockalControllers = require("app_modules/fintech/stockal/controllers");

// route_name: redirect
// route_path: /fintech/stockal/redirect
// route_description:
//      route used to redirect to stockal
stockalRoutes.get(
  "/redirect",
  sharedMiddlewares.authMiddleware,
  stockalControllers.redirect
);

module.exports = stockalRoutes;
