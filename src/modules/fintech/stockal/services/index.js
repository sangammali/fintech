const redirectService = require("./redirect.service");
const generateRedirectionLinkService = require("./generateRedirectionLink.service");

const stockalServices = {
  redirect: redirectService,
  generateRedirectionLink: generateRedirectionLinkService,
};

module.exports = stockalServices;
