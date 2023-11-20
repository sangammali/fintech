module.exports = {
  messages: {
    CUSS1001: {
      code: "CUSS1001",
      statusCode: 200,
      message: "Consent recieved successfully",
    },
  },
  errorMessages: {
    CUSE1001: {
      code: "CUSE1001",
      statusCode: 400,
      message: "Fintech name is required",
    },
    CUSE1002: {
      code: "CUSE1002",
      statusCode: 400,
      message: "User consent status is required",
    },
    CUSE1003: {
      code: "CUSE1003",
      statusCode: 400,
      message: "Customer ref id is required",
    },
    CUSE1004: {
      code: "CUSE1004",
      statusCode: 400,
      message: "Invalid user consent status",
    },
    CUSE1005: {
      code: "CUSE1005",
      statusCode: 400,
      message: "Customer id is required",
    },
  },
  consentStatus: {
    APPROVED: "APPROVED",
    REJECTED: "REJECTED",
  },
  TEST_CONSTANTS: {
    VALID_TOKEN: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcklkIjoxMiwiY3VzdG9tZXJSZWZJZCI6IjMwZWFkZGY1LWRjZmEtNGQyZC1iZDVmLTE3ZmZjZDUzYzA3OSIsImlhdCI6MTY5NTM1NzYxNywiZXhwIjoxOTU0NTU3NjE3fQ.ADnnkXqSShOufXjmL37N-DB-fT6ff7lCNNpHEDbpStM",
    INVALID_TOKEN: "invalid token",
    VALID_PAYLOAD: {
      "userConsentStatus": "REJECTED",
      "fintechName": "finbingo"
    },
    INVALID_PAYLOAD_1: {
      "userConsentStatus": "REJECTED",
    },
    INVALID_PAYLOAD_2: {
      "fintechName": "finbingo"
    },
  }
};
