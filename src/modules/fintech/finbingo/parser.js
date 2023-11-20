const sharedConstants = require("shared/constants");

const finbingoParser = {};

finbingoParser.customerDetails = ({
  customerRefId,
  customerDetails
}) => {
  let fullName = customerDetails.name;
  fullName = fullName.split(" ");

  const firstName = fullName[0];
  const lastName = fullName[fullName.length - 1];

  // calculate age
  let currentDay = new Date();
  let dob = new Date(customerDetails.dob);
  let age = currentDay.getFullYear() - dob.getFullYear();
  let m = currentDay.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && currentDay.getDate() < dob.getDate())) {
    age--;
  }


  let data = {
    clientId: customerRefId,
    firstName: firstName,
    Lastname: lastName,
    email: customerDetails.email,
    mobile: customerDetails.mobile,
    age: age,
    RedirectionURLPostUserJourneyCompletion: sharedConstants.appConfig.finbingo.redirectionAfterJournetCompletion,
  }

  return data;
}

finbingoParser.emptyCustomerDetails = ({
  customerRefId
}) => {

  let data = {
    clientId: customerRefId,
    firstName: "",
    Lastname: "",
    email: "",
    mobile: "",
    age: "",
    RedirectionURLPostUserJourneyCompletion: sharedConstants.appConfig.finbingo.redirectionAfterJournetCompletion,
  }

  return data;
}

module.exports = finbingoParser;
