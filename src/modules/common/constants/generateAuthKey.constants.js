module.exports = {
  messages: {
    CGAS0001: {
      code: "CGAS0001",
      statusCode: 200,
      message: "Auth key generated successfully",
    },
  },
  errorMessages: {
    CGAE0001: {
      code: "CGAE0001",
      statusCode: 400,
      message: "Customer ref id is required",
    },
    CGAE0002: {
      code: "CGAE0002",
      statusCode: 400,
      message: "Customer id is required",
    },
    CGAE0003: {
      code: "CGAE0003",
      statusCode: 400,
      message: "Fintech name is required",
    },
    CGAE0004: {
      code: "CGAE0004",
      statusCode: 400,
      message: "Plan id is required",
    },

    CGAE0005: {
      code: "CGAE0005",
      statusCode: 400,
      message: "Module name is required",
    },

  },
  TEST_CONSTANTS: {
    VALID_TOKEN: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcklkIjoxMiwiY3VzdG9tZXJSZWZJZCI6IjMwZWFkZGY1LWRjZmEtNGQyZC1iZDVmLTE3ZmZjZDUzYzA3OSIsImlhdCI6MTY5NTM1NzYxNywiZXhwIjoxOTU0NTU3NjE3fQ.ADnnkXqSShOufXjmL37N-DB-fT6ff7lCNNpHEDbpStM",
    PAYLOAD: {
      "fintechName": "finbingo",
      "planId": ""
    },
    INVALID_TOKEN: "invalid token"

  },
};
