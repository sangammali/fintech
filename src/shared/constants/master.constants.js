const masterConstants = {
  BAD_REQUEST: "ERR_BAD_REQUEST",
  PLATFORM_CODE: {
    CENTRUM: "CENTRUM",
  },
  FINTECH: {
    VOLTMONEY: "voltmoney",
    STOCKAL: "stockal",
    FINBINGO: "finbingo",
    GOLDENPI: "goldenpi",
    JARVIS: "jarvis",
  },
  CENTRUM_ERROR: {
    CENE0001: {
      code: "CENE0001",
      statusCode: 400,
      message: "Error while fetching documents",
    },
    CENE0002: {
      code: "CENE0002",
      statusCode: 400,
      message: "Error while fetching customer photo",
    },
  },
  API_ENDPOINTS: {
    GENERATE_AUTH_KEY: "/common/generate-auth-key",
    JOURNEY_INIT: "/common/init",
    CUSTOMER_CONSENT: "/common/consent-status",

    FINBINGO_REDIRECT: "/fintech/finbingo/redirect",
    FINBINGO_VALIDATE_TOKEN: "/fintech/finbingo/validate-token",

    STOCKAL_REDIRECT: "/fintech/stockal/redirect",

    VOLT_MONEY_REDIRECT: "/fintech/volt-money/redirect",

    GOLDEN_PI_REDIRECT: "/fintech/goldenPi/redirect",
    GOLDEN_PI_VALIDATE_TOKEN: "/fintech/goldenPi/validate-token",

    JARVIS_REDIRECT: "/fintech/jarvis/redirect",
    JARVIS_VALIDATE_TOKEN: "/fintech/jarvis/validate-token",
  },
  ACTION: {
    GENERATE_AUTH_KEY: "GENERATE_AUTH_KEY",
    JOURNEY_INIT: "JOURNEY_INIT",
    CUSTOMER_CONSENT: "CUSTOMER_CONSENT",

    FINBINGO_REDIRECT: "FINBINGO_REDIRECT",
    FINBINGO_VALIDATE_TOKEN: "FINBINGO_VALIDATE_TOKEN",

    STOCKAL_REDIRECT: "STOCKAL_REDIRECT",

    VOLT_MONEY_REDIRECT: "VOLT_MONEY_REDIRECT",

    GOLDEN_PI_REDIRECT: "GOLDEN_PI_REDIRECT",
    GOLDEN_PI_VALIDATE_TOKEN: "GOLDEN_PI_VALIDATE_TOKEN",

    JARVIS_REDIRECT: "JARVIS_REDIRECT",
    JARVIS_VALIDATE_TOKEN: "JARVIS_VALIDATE_TOKEN",

    CENTRUM_GET_CUSTOMER_DOCUMENTS: "CENTRUM_GET_CUSTOMER_DOCUMENTS",
    CENTRUM_GET_CUSTOMER_PHOTO: "CENTRUM_GET_CUSTOMER_PHOTO",
  },
  TMP_FOLDER_PATH: "public/tmp/",
};

module.exports = masterConstants;
