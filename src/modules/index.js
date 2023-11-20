const express = require("express");
const appModules = express.Router();

const fintechModules = require("app_modules/fintech");
const commonModules = require("app_modules/common/routes");

// module_name: fintech
// module_route: /fintech
// module_description:
//      handles routes related to fintech module
appModules.use("/fintech", fintechModules);

// module_name: common
// module_route: /common
// module_description:
//      handles routes related to common module
appModules.use("/common", commonModules);

module.exports = appModules;
