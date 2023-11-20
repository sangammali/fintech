module.exports = {
  messages: {
    FFBS1001: {
      code: "FFBS1001",
      statusCode: 200,
      message: "Customer details retrieved successfully",
    },
  },
  errorMessages: {
    FFBE1001: {
      code: "FFBE1001",
      statusCode: 400,
      message: "Token not found",
    },
    FFBE1002: {
      code: "FFBE1002",
      statusCode: 400,
      message: "Customer details not found",
    },
    FFBE1003: {
      code: "FFBE1003",
      statusCode: 400,
      message: "Invalid Token",
    },
  },
  consentStatus: {
    APPROVED: "APPROVED",
  },
  requestedData: {
    customerDetails: [
      "name",
      "email",
      "mobile",
      "dob"
    ]
  },
  tokenExpiredError: "TokenExpiredError",
  TEST_CONSTANTS: {
    VALID_TOKEN_WITH_CONSENT: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lclJlZklkIjoiMzBlYWRkZjUtZGNmYS00ZDJkLWJkNWYtMTdmZmNkNTNjMDc5IiwiY3VzdG9tZXJJZCI6MTIsImZpbnRlY2hJZCI6MSwiaWF0IjoxNjk1MzU4NTM0LCJleHAiOjE5NTQ1NTg1MzR9.jxSz-YrbXuRsMaTOUAiaI22MDS1kmEEHHTWAGQtN9Ks",
    VALID_TOKEN_WITHOUT_CONSENT: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lclJlZklkIjoiQUROQU4wMDAzIiwiY3VzdG9tZXJJZCI6MjksImZpbnRlY2hJZCI6MSwiaWF0IjoxNjk1MzU4ODEzLCJleHAiOjE5NTQ1NTg4MTN9.7RcWHz3LXdJYO1Zo452BZUYKg9IsLynFQ83xW6zvXfU",
    INVALID_TOKEN: "abc"
  }
};
