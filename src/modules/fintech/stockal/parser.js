const stockalParser = {};

stockalParser.customerDetailsParser = ({ customerRefId, customerDetails }) => {

  const fullName = customerDetails.name.split(" ");
  const firstName = fullName[0];
  const lastName = fullName[fullName.length - 1];

  let investmentExperience = customerDetails.trading_experience;

  if (investmentExperience == 0) {
    investmentExperience = "NONE";
  }

  if ([1, 2].includes(investmentExperience)) {
    investmentExperience = "YRS1_2";
  }

  if ([3, 4, 5].includes(investmentExperience)) {
    investmentExperience = "YRS_3_5";
  }

  if ([6, 7, 8, 9, 10].includes(investmentExperience)) {
    investmentExperience = "YRS_5_10";
  }

  if (investmentExperience > 10) {
    investmentExperience = "YRS_10";
  }

  const address = JSON.parse(customerDetails.address);

  let data = {
    firstName: firstName,
    lastName: lastName,
    password: 'Password@123',
    username: customerRefId,
    phone: customerDetails.mobile,
    email: customerDetails.email,
    gender: customerDetails.gender,
    country: 'IND',
    idNo: customerDetails.pan,
    idType: 'PAN',
    citizenship: 'IND',
    usTaxPayer: false,
    dob: customerDetails.dob,
    politicallyExposedNames: null,
    address1: address.address_line_1,
    address2: address.address_line_2,
    city: address.city,
    state: address.state,
    postalCode: address.pin_code,
    employmentStatus: 'EMPLOYED',
    employmentType: 'PROFESSIONAL',
    isBroker: false,
    directorOf: 'null',
    investmentExperience: investmentExperience,
    annualIncome: customerDetails.annual_income,
    networthLiquid: customerDetails.annual_income,
    networthTotal: customerDetails.annual_income,
    riskTolerance: 'MODERATE',
    termsOfUse: true,
    rule14b: true,
    customerAgreement: true,
    marketDataAgreement: true,
    privacyPolicy: true,
    dataSharing: true,
    stockalTermsOfUse: true,
    // documents: customerDetails.documents,
    documents: [
      {
        docId: "f19b22de-b896-4f88-b720-e9acac4c9cc8",
        proofType: "ADDRESS",
        docSide: "FRONT",
        docType: "NATIONAL_ID_CARD"
      },
      {
        docId: "5424afb9-0cdf-4960-9467-5b6fced56f74",
        proofType: "ADDRESS",
        docSide: "BACK",
        docType: "NATIONAL_ID_CARD"
      },
      {
        docId: "e2cc951d-7aa1-4e88-b9ed-02404a4018e7",
        proofType: "ID",
        docSide: "FRONT",
        docType: "NATIONAL_ID_CARD"
      },
      {
        docId: "42a707f7-65c6-410d-a247-a09c3411b39e",
        proofType: "ID",
        docSide: "BACK",
        docType: "NATIONAL_ID_CARD"
      }
    ],
    signedBy: customerDetails.name,
  };

  return data;

}


module.exports = stockalParser;