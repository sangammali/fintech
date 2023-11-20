const finbingoConstants = require("app_modules/fintech/finbingo/constants");
const sharedConstants = require("shared/constants");
const encryptionServices = require("shared/services/encryption.services");
const axios = require("axios");

const iamServices = {};

// @service-name : get user details
// @service-desc : get the user details from IAM
iamServices.getUserDetails = async (customerRefId, requestedData) => {
  let customerDetails;

  const requestUrl = sharedConstants.appConfig.IAM.baseUrl + "/customer/info";
  const payload = JSON.stringify({
    customer_id: customerRefId,
    requested_data: requestedData,
  });
  const headers = {
    "Content-Type": "application/json",
    "api-key": sharedConstants.appConfig.IAM.apiKey,
    "api-secret": sharedConstants.appConfig.IAM.apiSecret,
  };

  /**encrypt payload */
  // const encryptedPayload = encryptionServices.encryptUsingRsaAlgorithm(payload);

  // const res = await axios.post(requestUrl, encryptedPayload, { headers });
  const res = await axios.post(requestUrl, payload, { headers });

  /**decrypt response */
  // const decryptedResponse = encryptionServices.decryptUsingRsaAlgorithm(res.data.result);

  if (res.status == 200) {
    //customerDetails = decryptedResponse;
    customerDetails = res.data.result;
    return customerDetails;
  } else {
    return sharedServices.error.throw(
      finbingoConstants.validateToken.errorMessages.FFBE1002
    );
  }
};

module.exports = iamServices;
