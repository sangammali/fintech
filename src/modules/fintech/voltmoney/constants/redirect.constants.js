module.exports = {
  messages: {
    FVMS0001: {
      code: "FVMS0001",
      statusCode: 200,
      message: "Successfully generated redirection params",
    },
  },
  errorMessages: {
    FVME0001: {
      code: "FVME0001",
      statusCode: 400,
      message: "Token is required",
    },
    FVME0002: {
      code: "FVME0002",
      statusCode: 400,
      message: "Failed to generate auth token",
    },
    FVME0003: {
      code: "FVME0003",
      statusCode: 400,
      message: "Failed to create customer",
    },
    FVME0004: {
      code: "FVME0004",
      statusCode: 400,
      message: "Failed to generate customer SSO token",
    },
    FVME0005: {
      code: "FVME0005",
      statusCode: 400,
      message: "Customer id not found",
    },
    FVME0006: {
      code: "FVME0006",
      statusCode: 400,
      message: "Customer ref id not found",
    },
    FVME0007: {
      code: "FVME0007",
      statusCode: 400,
      message: "Bad request while creating customer",
    },
  },
  requestedData: {
    customerId: ["customer_id"],
    createCustomer: [
      "customer_ref_id",
      "mobile",
      "email",
      "pan",
      "dob",
      "name",
      "father_name",
      "gender",
      "address",
      "marital_status",
      "account_number",
      "ifsc_code",
    ],
  },
  apiName: {
    createCustomer: "voltmoney-create-cust",
    generateAuthToken: "voltmoney-generate-auth-token",
    getCustomerSSOToken: "voltmoney-get-customer-sso-token",
  },
  tokenExpiredError: "TokenExpiredError",
  action: {
    GENERATE_AUTH_KEY: "VOLTMONEY_GENERATE_AUTH_KEY",
    CREATE_CUSTOMER: "VOLTMONEY_CREATE_CUSTOMER",
    GENERATE_SSO_TOKEN: "VOLTMONEY_GENERATE_SSO_TOKEN",
  },
  TEST_CONSTANTS: {
    VALID_TOKEN: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcklkIjoxMiwiY3VzdG9tZXJSZWZJZCI6IjMwZWFkZGY1LWRjZmEtNGQyZC1iZDVmLTE3ZmZjZDUzYzA3OSIsImlhdCI6MTY5NTM1NzYxNywiZXhwIjoxOTU0NTU3NjE3fQ.ADnnkXqSShOufXjmL37N-DB-fT6ff7lCNNpHEDbpStM",
    INVALID_TOKEN: "invalid token",
  }
};
