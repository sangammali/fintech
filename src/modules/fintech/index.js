const express = require("express");
const fintechModules = express.Router();

const finbingoModule = require("app_modules/fintech/finbingo/routes");
const voltmoneyModule = require("app_modules/fintech/voltmoney/routes");
const stockalModule = require("app_modules/fintech/stockal/routes");
const goldenPiModule = require("app_modules/fintech/goldenPi/routes");
const jarvisModule = require("app_modules/fintech/jarvis/routes");

// module_name: finbingo
// module_route: /fintech/finbingo
// module_description:
//      handles routes related to finbingo module
fintechModules.use("/finbingo", finbingoModule);

// module_name: volt money
// module_route: /fintech/volt-money
// module_description:
//      handles routes related to volt money module
fintechModules.use("/volt-money", voltmoneyModule);

// module_name: stockal
// module_route: /fintech/stockal
// module_description:
//      handles routes related to stockal module
fintechModules.use("/stockal", stockalModule);

// module_name: goldenPi
// module_route: /fintech/goldenPi
// module_description:
//      handles routes related to goldenPi module
fintechModules.use("/goldenPi", goldenPiModule);

// module_name: jarvis
// module_route: /fintech/jarvis
// module_description:
//      handles routes related to goldenPi module
fintechModules.use("/jarvis", jarvisModule);

module.exports = fintechModules;
