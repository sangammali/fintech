module.exports = {
  messages: {
    FFBS0001: {
      code: "FFBS0001",
      statusCode: 200,
      message: "Redirection URL generated successfully",
    },
  },
  errorMessages: {
    FFBE0001: {
      code: "FFBE0001",
      statusCode: 400,
      message: "Token is required",
    },
    FFBE0002: {
      code: "FFBE0002",
      statusCode: 400,
      message: "Customer id not found",
    },
    FFBE0003: {
      code: "FFBE0003",
      statusCode: 400,
      message: "Customer details not found",
    },
    FFBE0004: {
      code: "FFBE0004",
      statusCode: 400,
      message: "Fintech details not found",
    },
    FFBE0005: {
      code: "FFBE0005",
      statusCode: 400,
      message: "Customer ref id not found",
    },
    FFBE0006: {
      code: "FFBE0006",
      statusCode: 400,
      message: "Module name is required",
    },
  },
  iam: {
    requestedData: {
      customerId: ["customerId"],
    },
  },
  apiName: {
    redirectApi: "finbingo-redirect",
  },
  jwtError: {
    invalidSignature: "JsonWebTokenError",
    tokenExpired: "TokenExpiredError",
  },
  TEST_CONSTANTS: {
    VALID_TOKEN: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcklkIjoxMiwiY3VzdG9tZXJSZWZJZCI6IjMwZWFkZGY1LWRjZmEtNGQyZC1iZDVmLTE3ZmZjZDUzYzA3OSIsImlhdCI6MTY5NTM1NzYxNywiZXhwIjoxOTU0NTU3NjE3fQ.ADnnkXqSShOufXjmL37N-DB-fT6ff7lCNNpHEDbpStM",
    INVALID_TOKEN: "abc"
  }
};
