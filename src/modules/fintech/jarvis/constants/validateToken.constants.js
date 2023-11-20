module.exports = {
  messages: {
    FJS1001: {
      code: "FJS1001",
      statusCode: 200,
      message: "Customer details retrieved successfully",
    },
  },
  errorMessages: {
    FJE1001: {
      code: "FJE1001",
      statusCode: 400,
      message: "Token not found",
    },
    FJE1002: {
      code: "FJE1002",
      statusCode: 400,
      message: "Customer details not found",
    },
    FJE1003: {
      code: "FJE1003",
      statusCode: 400,
      message: "Invalid Token",
    },
  },
  consentStatus: {
    APPROVED: "APPROVED",
  },
  requestedData: {
    customerDetails: [
      "customer_ref_id",
      "name",
      "email",
      "mobile",
      "pan",
      "dob",
    ],
  },
  tokenExpiredError: "TokenExpiredError",
  TEST_CONSTANTS: {
    VALID_TOKEN_WITH_CONSENT:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lclJlZklkIjoicHFyeHl6IiwiY3VzdG9tZXJJZCI6MTgsImZpbnRlY2hJZCI6NSwiaWF0IjoxNjk1MzY0Mzc5LCJleHAiOjE2OTUzNjQ0OTl9.XNKWJ2G8fxa-yVWbXEB_JdwD6-KiMKGVeBTGrSP9SeM",
    VALID_TOKEN_WITHOUT_CONSENT:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lclJlZklkIjoicHFyeHl6IiwiY3VzdG9tZXJJZCI6MTgsImZpbnRlY2hJZCI6NSwiaWF0IjoxNjk1MzY0Mzc5LCJleHAiOjE2OTUzNjQ0OTl9.XNKWJ2G8fxa-yVWbXEB_JdwD6-KiMKGVeBTGrSP9SeM",
    INVALID_TOKEN: "invalid token",
  },
};
