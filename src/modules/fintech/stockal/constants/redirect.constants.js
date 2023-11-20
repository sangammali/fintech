module.exports = {
  messages: {
    FSAS0001: {
      code: "FSAS0001",
      statusCode: 200,
      message: "Successfully generated redirect link",
    },
  },
  errorMessages: {
    FSAE0001: {
      code: "FSAE0001",
      statusCode: 400,
      message: "Customer ref id is required",
    },
    FSAE0002: {
      code: "FSAE0002",
      statusCode: 400,
      message: "Failed to create customer",
    },
    FSAE0003: {
      code: "FSAE0003",
      statusCode: 400,
      message: "Failed to create subscription",
    },
    FSAE0004: {
      code: "FSAE0004",
      statusCode: 400,
      message: "Failed to generate auth code",
    },
    FSAE0005: {
      code: "FSAE0005",
      statusCode: 400,
      message: "Failed to generate auth key",
    },
    FSAE0006: {
      code: "FSAE0006",
      statusCode: 400,
      message: "Failed to upload document",
    },
    FSAE0007: {
      code: "FSAE0007",
      statusCode: 400,
      message: "Plan id is required",
    },
    FSAE0008: {
      code: "FSAE0008",
      statusCode: 400,
      message: "Customer id is required",
    },
    FSAE0009: {
      code: "FSAE0009",
      statusCode: 400,
      message: "Bad request while creating customer",
    },
  },
  apiName: {
    createCustomer: "stockal-create-cust",
    createSub: "stockal-create-sub",
    generateAuthCode: "stockal-generate-auth-code",
    redirect: "stockal-redirect",
    generateAuthKey: "stockal-generate-auth-key",
    uploadDoc: "stockal-upload-document"
  },
  requestedData: {
    customerId: ["customerId"],
    createCustomer: [
      "name",
      "email",
      "mobile",
      "address",
      "gender",
      "pan",
      "fatca",
      "dob",
      "pep",
      "occupation",
      "trading_experience",
      "annual_income",
    ],
  },
  action: {
    GENERATE_AUTH_KEY: "STOCKAL_GENERATE_AUTH_KEY",
    UPLOAD_DOCUMENT: "STOCKAL_UPLOAD_DOCUMENT",
    CREATE_CUSTOMER: "STOCKAL_CREATE_CUSTOMER",
    CREATE_SUBSCRIPTION: "STOCKAL_CREATE_SUBSCRIPTION",
    GENERATE_AUTH_CODE: "STOCKAL_GENERATE_AUTH_CODE",
  },
  TEST_CONSTANTS: {
    VALID_TOKEN: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcklkIjoxMiwiY3VzdG9tZXJSZWZJZCI6IjMwZWFkZGY1LWRjZmEtNGQyZC1iZDVmLTE3ZmZjZDUzYzA3OSIsImlhdCI6MTY5NTM1NzYxNywiZXhwIjoxOTU0NTU3NjE3fQ.ADnnkXqSShOufXjmL37N-DB-fT6ff7lCNNpHEDbpStM",
    INVALID_TOKEN: "invalid token",
    PLAN_ID: "BLPVYEYUI4CPCDM5",
  }
};
