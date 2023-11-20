const sharedServices = require("shared/services");
const sharedModels = require("shared/models");
const sharedConstants = require("shared/constants");

module.exports = async ({
  customerRefId,
  customerId,
  fintechName,
  planId,
  moduleName,
  offerCode,
  requestId,
}) => {
  // Generate fintech expiry time (+3mins)
  // Adding 3 mins to current timestamp
  const currentTimeStamp = new Date().setMinutes(
    new Date().getMinutes() +
      Number(sharedConstants.appConfig.fintech.tokenExpiryTime)
  );
  const currentDateTime = new Date(currentTimeStamp);

  // Add 5.30 hrs to date to convert to IST
  currentDateTime.setHours(
    currentDateTime.getHours() + 5,
    currentDateTime.getMinutes() + 30
  );

  let expiryDateTime = currentDateTime.toISOString();
  expiryDateTime = expiryDateTime.split(".")[0];
  expiryDateTime = expiryDateTime.replaceAll("T", " ");

  sharedServices.loggerServices.success.info({
    requestId,
    stage: "Generate Auth Key - generated expiry time",
    msg: "Calculated the expiry time with +3 mins",
    expiryDateTime,
  });

  // generate fintech GUID
  // const fintechRequestId = await sharedServices.mysqlHelperServices.generateRefID(
  //   customerRefId,
  //   fintechName
  // );

  const fintechRequestId = sharedServices.uuidServices.uuidV4();

  sharedServices.loggerServices.success.info({
    requestId,
    stage: "Generate Auth Key - generated GUID",
    msg: "GUID generated for the request",
    fintechRequestId,
  });

  // create fintech request log
  await sharedModels.fintechRequestLog.create(
    customerRefId,
    customerId,
    fintechName,
    planId,
    moduleName,
    offerCode,
    fintechRequestId,
    expiryDateTime
  );

  sharedServices.loggerServices.success.info({
    requestId,
    stage: "Generate Auth Key - create DB entry",
    msg: "Created a GUID token for client and pushed details in database",
    customerRefId,
    customerId,
    fintechName,
    planId,
    moduleName,
    offerCode,
    fintechRequestId,
    expiryDateTime,
  });

  return { fintechRequestId };
};
