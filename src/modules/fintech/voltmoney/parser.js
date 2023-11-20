const moment = require("moment");
const voltmoneyParser = {};

voltmoneyParser.createCustomer = ({
  customerDetails,
  documentDetails,
  customerPhoto,
}) => {
  const address = JSON.parse(customerDetails.address);
  let date = new Date(customerDetails.dob);
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();

  let data = {
    externalId: customerDetails.customer_ref_id,
    mobileNumber: customerDetails.mobile,
    email: customerDetails.email,
    pan: customerDetails.pan,
    dob: day + "-" + month + "-" + year,
    personalDetails: {
      fullName: customerDetails.name,
      firstName: customerDetails.name,
      middleName: customerDetails.father_name,
      gender: customerDetails.gender,
      currentAddress: {
        addressLine1: address.address_line_1,
        addressLine2: address.address_line_2,
        addressLine3: address.address_line_3,
        city: address.city,
        state: address.state,
        country: address.country,
        pinCode: address.pin_code,
      },
      maritalStatus: customerDetails.marital_status,
      photo: customerPhoto,
    },
    bankAccountDetails: {
      bankAccountNumber: customerDetails.bank_details[0].account_number,
      bankIfscCode: customerDetails.bank_details[0].ifsc_code,
    },
  };

  data.personalDetails.documentDetails = [];

  // Accepted values for:
  // documentPurpose: (PROOF_OF_ADDRESS, PROOF_OF_IDENTITY)
  // documentType: (DRIVING_LICENSE, VOTERID, AADHAAR, PASSPORT, PAN)
  for (const document of documentDetails) {
    data.personalDetails.documentDetails.push({
      documentFileFront: document.docSide == "FRONT" ? "FRONT" : "",
      documentFileBack: document.docSide == "BACK" ? "BACK" : "",
      documentNumber: "",
      documentPurpose: document.proofType,
      documentType: document.docType,
    });
  }

  return data;
};

module.exports = voltmoneyParser;
