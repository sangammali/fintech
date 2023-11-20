const sharedServices = require("shared/services");
const loggerServices = require("shared/services/logger.services");
const dbLoggerServices = require("shared/services/dbLogger.services");
const sharedConstants = require("shared/constants");
const stockalConstants = require("../constants");
const axios = require("axios");
const fs = require("fs");

module.exports = async ({
  stockalCustomerId,
  generateAuthCodeApi,
  redirectEndpoint,
  clientSecret,
  clientId,
  fintechPartnerId,
  requestId,
}) => {
  stockalCustomerId = '5cb2dfcb-4ff4-4285-b19d-fbf7044e8dfc"';
  generateAuthCodeApi = 'https://uatapi-v2.stockal.com/v2/partnersso/login';
  const privateKey = fs.readFileSync(
    sharedConstants.appConfig.stockal.privateKey,
    'utf8'
  );

  const idToken = sharedServices.authServices.getJWT(
    { stockal_username: stockalCustomerId },
    privateKey,
    {
      algorithm: sharedConstants.appConfig.stockal.encryptionAlgo,
      expiresIn: sharedConstants.appConfig.stockal.jwtExpireTime,
      audience: sharedConstants.appConfig.stockal.audience,
      issuer: fintechPartnerId,
    }
  );

  loggerServices.success.info({
    requestId,
    stage: "Stockal redirect - Generate idToken",
    msg: "idToken generated successfully",
    stockalCustomerId,
    fintechPartnerId,
    idToken,
  });

  const requestUrl = generateAuthCodeApi;
  const payload = JSON.stringify({
    client_id: clientId,
    client_secret: clientSecret,
    id_token: idToken,
  });
  const headers = {
    accept: "application/json",
    "content-type": "application/json",
  };
  let authCode;

  // const res = await axios.post(requestUrl, payload, { headers });
  const res = {
    authcode: "f1xxx5a9-e265-yyyy-8337-c34dzzzz5bac"
  }

  if (res.authcode) {

    await dbLoggerServices.log({
      action: stockalConstants.redirect.action.GENERATE_AUTH_CODE,
      request: {
        requestUrl,
        client_id: clientId,
        client_secret: clientSecret, 
        id_token: idToken,
        headers,
      },
      response: res,
      code: res.status,
    });

    authCode = res.authcode;
  } else {

    await dbLoggerServices.log({
      action: stockalConstants.redirect.action.GENERATE_AUTH_CODE,
      request: {
        requestUrl,
        client_id: clientId,
        client_secret: clientSecret, 
        id_token: idToken,
        headers,
      },
      response: res,
      code: res.status,
    });

    return sharedServices.error.throw(
      stockalConstants.redirect.errorMessages.FSAE0004
    );
  }

  redirectEndpoint = redirectEndpoint.replaceAll("<authcode>", authCode);

  return redirectEndpoint;
};
