const express = require("express");
const commonModuleRoutes = express.Router();
const sharedMiddlewares = require("shared/middlewares");
const commonModuleController = require("app_modules/common/controllers");

// route_name: generate-auth-key
// route_path: /common/generate-auth-key
// route_description:
//      route used to generate auth key for client
commonModuleRoutes.post(
  "/generate-auth-key",
  sharedMiddlewares.authMiddleware,
  commonModuleController.generateAuthKey
);

// route_name: init
// route_path: /common/init
// route_description:
//      route used to initialize journey
commonModuleRoutes.get("/init", commonModuleController.init);

// route_name: consent-status
// route_path: /common/consent-status
// route_description:
//      route used to set common consent
commonModuleRoutes.post(
  "/consent-status",
  sharedMiddlewares.authMiddleware,
  commonModuleController.consentStatus
);

// route_name: fintech-meta-data
// route_path: /common/fintech-meta-data
// route_description:
//      route used to get fintech meta data
commonModuleRoutes.get(
  "/fintech-meta-data",
  sharedMiddlewares.authMiddleware,
  commonModuleController.fintechMeta
);

// route_name: fintech-customer-linking
// route_path: /common/fintech-customer-linking
// route_description:
//      route used to get fintech customer linking data
commonModuleRoutes.get(
  "/fintech-customer-linking",
  sharedMiddlewares.authMiddleware,
  commonModuleController.fintechCustomerLinking
);

module.exports = commonModuleRoutes;
