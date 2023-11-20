module.exports = {
  messages: {
    CUSS0001: {
      code: "CUSS0001",
      statusCode: 200,
      message: "Successfully received the consent status",
    },
  },
  errorMessages: {
    CUSE0001: {
      code: "CUSE0001",
      statusCode: 400,
      message: "Auth key is required",
    },
    CUSE0002: {
      code: "CUSE0002",
      statusCode: 400,
      message: "Auth key is invalid or expired",
    },
  },
  consentStatus: {
    APPROVED: "APPROVED",
    REJECTED: "REJECTED",
  },
  TEST_CONSTANTS: {
    AUTH_KEY: "809e8fda-955c-4ad3-adb6-38e15001af92",
    INVALID_AUTH_KEY: "invalid auth key"
  },
};
