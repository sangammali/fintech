const dbLoggerServices = require("shared/services/dbLogger.services");
const uuidServices = require("shared/services/uuid.services");
const sharedConstants = require("../constants");

const getParams = (params) => {
  if (params.length === 3) {
    return {
      req: params[0],
      res: params[1],
      next: params[2],
    };
  }
  if (params.length === 4) {
    return {
      error: params[0],
      req: params[1],
      res: params[2],
      next: params[3],
    };
  }
};

const eventLoggingMiddleware = (...params) => {
  const { req, res, next, error } = getParams(params);
  const requestId = uuidServices.uuidV4();
  req.requestId = requestId;

  req.on("end", () => requestOnEnd(...params));

  req.on("aborted", () => requestOnAbort(...params));

  req.on("error", (err) => requestOnError(...params, err));

  res.on("finish", () => responseOnFinish(...params));

  res.on("error", (err) => responseOnError(...params, err));

  next();
};

// method_name: requestOnEnd
// method_description:
//      gets called when request is received
const requestOnEnd = (req, res) => {
  console.log(`requestOnEnd`);
};

// method_name: requestOnAbort
// method_description:
//      gets called when the request has been aborted by the client.
const requestOnAbort = (req, res) => {
  console.log(`requestOnAbort`);
};

// method_name: requestOnError
// method_description:
//      gets called when an error occurs during request processing.
const requestOnError = (req, res, err) => {
  console.log(`requestOnError`);
};

// method_name: responseOnFinish
// method_description:
//      gets called when the entire response has been sent to the client.
const responseOnFinish = async (...params) => {
  const { req, res, next, error } = getParams(params);

  let action = "";

  // Common actions
  if (
    req.url.includes(
      sharedConstants.masterConstants.API_ENDPOINTS.GENERATE_AUTH_KEY
    )
  ) {
    action = sharedConstants.masterConstants.ACTION.GENERATE_AUTH_KEY;
  }

  if (
    req.url.includes(sharedConstants.masterConstants.API_ENDPOINTS.JOURNEY_INIT)
  ) {
    action = sharedConstants.masterConstants.ACTION.JOURNEY_INIT;
  }

  if (
    req.url.includes(
      sharedConstants.masterConstants.API_ENDPOINTS.CUSTOMER_CONSENT
    )
  ) {
    action = sharedConstants.masterConstants.ACTION.CUSTOMER_CONSENT;
  }

  // Finbingo actions
  if (
    req.url.includes(
      sharedConstants.masterConstants.API_ENDPOINTS.FINBINGO_REDIRECT
    )
  ) {
    action = sharedConstants.masterConstants.ACTION.FINBINGO_REDIRECT;
  }

  if (
    req.url.includes(
      sharedConstants.masterConstants.API_ENDPOINTS.FINBINGO_VALIDATE_TOKEN
    )
  ) {
    action = sharedConstants.masterConstants.ACTION.FINBINGO_VALIDATE_TOKEN;
  }

  // Stockal actions
  if (
    req.url.includes(
      sharedConstants.masterConstants.API_ENDPOINTS.STOCKAL_REDIRECT
    )
  ) {
    action = sharedConstants.masterConstants.ACTION.STOCKAL_REDIRECT;
  }

  // Voltmoney actions
  if (
    req.url.includes(
      sharedConstants.masterConstants.API_ENDPOINTS.VOLT_MONEY_REDIRECT
    )
  ) {
    action = sharedConstants.masterConstants.ACTION.VOLT_MONEY_REDIRECT;
  }

  // GoldenPi actions
  if (
    req.url.includes(
      sharedConstants.masterConstants.API_ENDPOINTS.GOLDEN_PI_REDIRECT
    )
  ) {
    action = sharedConstants.masterConstants.ACTION.GOLDEN_PI_REDIRECT;
  }

  if (
    req.url.includes(
      sharedConstants.masterConstants.API_ENDPOINTS.GOLDEN_PI_VALIDATE_TOKEN
    )
  ) {
    action = sharedConstants.masterConstants.ACTION.GOLDEN_PI_VALIDATE_TOKEN;
  }

  // Jarvis actions
  if (
    req.url.includes(
      sharedConstants.masterConstants.API_ENDPOINTS.JARVIS_REDIRECT
    )
  ) {
    action = sharedConstants.masterConstants.ACTION.JARVIS_REDIRECT;
  }

  if (
    req.url.includes(
      sharedConstants.masterConstants.API_ENDPOINTS.JARVIS_VALIDATE_TOKEN
    )
  ) {
    action = sharedConstants.masterConstants.ACTION.JARVIS_VALIDATE_TOKEN;
  }

  const parsedReq = {
    method: req.method,
    url: req.url,
    requestId: req.requestId,
    headers: req.headers,
    body: req.body,
    queryParams: req.query || "",
  };

  const parsedRes = {
    status: res.statusCode,
    message: res.statusMessage,
  };

  if (res.statusCode >= 200 && res.statusCode < 300) {
    await dbLoggerServices.log({
      action: action,
      request: parsedReq,
      response: parsedRes,
      code: res.statusCode,
    });
  }
  if (res.statusCode >= 400 && res.statusCode < 500) {
    await dbLoggerServices.log({
      action: action,
      request: parsedReq,
      response: parsedRes,
      code: res.statusCode,
    });
  }
  if (res.statusCode >= 500 && res.statusCode < 600) {
    await dbLoggerServices.log({
      action: action,
      request: parsedReq,
      response: parsedRes,
      code: res.statusCode,
    });
  }
};

// method_name: responseOnError
// method_description:
//      gets called when an error occurs during response processing.
const responseOnError = (req, res, err) => {
  console.log(`responseOnError`);
};

module.exports = eventLoggingMiddleware;
