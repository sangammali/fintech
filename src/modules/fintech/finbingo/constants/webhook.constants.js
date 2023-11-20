module.exports = {
  messages: {
    FFBWS0001: {
      code: "FFBWS0001",
      statusCode: 200,
      message: "Webhook acknowledged",
    },
  },
  errorMessages: {
    FFBWE0001: {
      code: "FFBWE0001",
      statusCode: 400,
      message: "Client Id is required",
    },
    FFBWE0002: {
      code: "FFBWE0002",
      statusCode: 400,
      message: "Module Name is required",
    },
    FFBWE0003: {
      code: "FFBWE0003",
      statusCode: 400,
      message: "Module Name is invalid",
    },
    FFBWE0004: {
      code: "FFBWE0004",
      statusCode: 400,
      message: "Input is required",
    },
    FFBWE0005: {
      code: "FFBWE0005",
      statusCode: 400,
      message: "Output is required",
    },
    FFBWE0006: {
      code: "FFBWE0006",
      statusCode: 400,
      message: "Customer details not found",
    },
  },
  moduleName: {
    WB: "WB",
    TPA: "TPA",
    RP: "RP",
  },
  requestedData: {
    customerDetails: ["customerId"],
  },
  fintechName: "finbingo",
  action: {
    WEBHOOK: "FINBINGO_WEBHOOK",
  },

  TEST_CONSTANT: {
    VALID_PAYLOAD: {
      clientId: "pqrxyz",
      userId: "64b8d90d8901442714e22ff6XYZ123",
      partnerId: "64b8d90d8901442714e22ff6",
      moduleName: "RP",
      documentId: "64fef6ba0607c1576fc1914d",
      input: [
        {
          profilingDetails: [
            {
              questionId: "64b28e6b578b5a6bb92b5d08",
              questionText:
                "How many are financially dependent on your income?",
              answers: [
                {
                  answerId: "64b28e6b578b5a6bb92b5d06",
                  answerText: "5-6",
                  answerScore: 5,
                },
              ],
            },
            {
              questionId: "64b28eb1578b5a6bb92b5d0e",
              questionText: "Where do you normally make your investments?",
              answers: [
                {
                  answerId: "64b28eb1578b5a6bb92b5d09",
                  answerText: "PPF/Bank FD's & Gold",
                  answerScore: 0,
                },
                {
                  answerId: "64b28eb1578b5a6bb92b5d0a",
                  answerText: "Bonds/Debt Products",
                  answerScore: 5,
                },
              ],
            },
            {
              questionId: "64b28ed1578b5a6bb92b5d14",
              questionText:
                "How long do you normally stay invested for? (years)",
              answers: [
                {
                  answerId: "64b28ed1578b5a6bb92b5d12",
                  answerText: "1 to 3",
                  answerScore: 5,
                },
              ],
            },
            {
              questionId: "64b28f8e578b5a6bb92b5d1a",
              questionText:
                "How much of your income is spent towards monthly expenses?",
              answers: [
                {
                  answerId: "64b28f8e578b5a6bb92b5d15",
                  answerText: ">80%",
                  answerScore: 0,
                },
              ],
            },
            {
              questionId: "64b28fd0578b5a6bb92b5d20",
              questionText:
                "To what extent would you expose your investments to risk, in order to earn higher returns?",
              answers: [
                {
                  answerId: "64b28fd0578b5a6bb92b5d1f",
                  answerText: "<10%",
                  answerScore: 0,
                },
              ],
            },
          ],
        },
      ],
      output: [
        {
          riskScore: {
            totalScore: 15,
            scoreRange: "0-20 %",
            riskCategory: "Risk Averse",
            riskCategoryId: "64b014e1f02b9c29b05a9e19",
          },
          createDate: "2023-09-07T14:09:03.410Z",
          updateDate: "2023-09-07T14:09:11.339Z",
        },
      ],
    },

    INVALID_PAYLOAD_WITH_MISSING_KEYS: {
      // clientId: "pqrxyz",
      // userId: "64b8d90d8901442714e22ff6XYZ123",
      // partnerId: "64b8d90d8901442714e22ff6",
      // moduleName: "RP",
      // documentId: "64fef6ba0607c1576fc1914d",
      // input: [],
      // output: [],
    },

    INVALID_PAYLOAD_WITH_EMPTY_VALUES: {
      clientId: "",
      userId: "",
      partnerId: "",
      moduleName: "",
      documentId: "",
      input: [],
      output: [],
    },

    PAYLOAD_WITH_All_KEYS_BUT_INVALID_VALUES: {
      clientId: "pqrxyz888",
      userId: "64b8d90d8901442714e22ff6XYZ123",
      partnerId: "64b8d90d8901442714e22ff6",
      moduleName: "test",
      documentId: "64fef6ba0607c1576fc1914d",
      input: [],
      output: [],
    },

    PAYLOAD_KEYS: ["clientId", "moduleName", "input", "output"],
    MODULE_NAME: ["WB", "TPA", "RP"],
  },
};
