const sharedConstants = require("shared/constants");

const jarvisParser = {};

jarvisParser.customerDetails = ({ customerRefId, customerDetails }) => {
  let data = {
    centrumCustomerRefId: customerRefId,
    fullName: customerDetails.name,
    email: customerDetails.email,
    mobile: customerDetails.mobile,
    pan: customerDetails.pan,
    dob: customerDetails.dob,
    RedirectionURLPostUserJourneyCompletion:
      sharedConstants.appConfig.finbingo.redirectionAfterJournetCompletion,
  };

  return data;
};

jarvisParser.emptyCustomerDetails = ({ customerRefId }) => {
  let data = {
    centrumCustomerRefId: "",
    fullName: "",
    email: "",
    mobile: "",
    pan: "",
    dob: "",
    RedirectionURLPostUserJourneyCompletion:
      sharedConstants.appConfig.finbingo.redirectionAfterJournetCompletion,
  };

  return data;
};

module.exports = jarvisParser;
