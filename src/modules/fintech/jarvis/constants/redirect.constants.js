module.exports = {
  messages: {
    FJS0001: {
      code: "FJS0001",
      statusCode: 200,
      message: "Redirection URL generated successfully",
    },
  },
  errorMessages: {
    FJE0001: {
      code: "FJE0001",
      statusCode: 400,
      message: "Token is required",
    },
    FJE0002: {
      code: "FJE0002",
      statusCode: 400,
      message: "Customer id not found",
    },
    FJE0003: {
      code: "FJE0003",
      statusCode: 400,
      message: "Customer details not found",
    },
    FJE0004: {
      code: "FJE0004",
      statusCode: 400,
      message: "Fintech details not found",
    },
    FJE0005: {
      code: "FJE0005",
      statusCode: 400,
      message: "Customer ref id not found",
    },
    FJE0006: {
      code: "FJE0006",
      statusCode: 400,
      message: "Module Name Is Required",
    },
    FJE0007: {
      code: "FJE0007",
      statusCode: 400,
      message: "Module Name Is Invalid",
    },
  },
  iam: {
    requestedData: {
      customerId: ["customerId"],
    },
  },
  apiName: {
    redirectApi: "jarvis-redirect",
  },
  jwtError: {
    invalidSignature: "JsonWebTokenError",
    tokenExpired: "TokenExpiredError",
  },
  moduleName: {
    PORTFOLIO: "PORTFOLIO",
    PROTECT: "PROTECT",
    ONESTOCK: "ONESTOCK",
  },
  utmSource: "centrum",
  TEST_CONSTANTS: {
    VALID_TOKEN:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcklkIjoxOCwiY3VzdG9tZXJSZWZJZCI6InBxcnh5eiIsImlhdCI6MTY5NTM2MzU0MCwiZXhwIjoxNjk1NDA2NzQwfQ.QdeDCs4FOGap9KuZkWNAq_fhSX_iKG9deKvDUX1i9cA",
    INVALID_TOKEN: "abc",
    VALID_MODULE_NAME: "PORTFOLIO",
    INVALID_MODULE_NAME: "TEST",

    MODULE_NAME: ["PORTFOLIO", "PROTECT", "ONESTOCK"],
  },
};
