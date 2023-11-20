const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("src/index.js");
const { expect, assert } = chai;
const sharedServices = require("shared/services");
const sharedConstants = require("shared/constants");
const webhookConstants = require("../constants/webhook.constants");

chai.should();
chai.use(chaiHttp);

// Api  : /fintech/finbingo/webhook
// Desc : Finbingo redirect api should return
//        clientId and webhookDateTime in result
// Case : Positive
describe("Case: Positive", () => {
  const payload = webhookConstants.TEST_CONSTANT.VALID_PAYLOAD;

  it("payload should be of type object", () => {
    expect(payload).to.be.a("object");
  });

  it("payload should contains mandatory fields", () => {
    assert.containsAllKeys(
      payload,
      webhookConstants.TEST_CONSTANT.PAYLOAD_KEYS
    );
  });

  it("mandatory fields should not be empty", () => {
    assert.isNotEmpty(
      payload.clientId,
      webhookConstants.errorMessages.FFBWE0001.message
    );
    assert.isNotEmpty(
      payload.moduleName,
      webhookConstants.errorMessages.FFBWE0002.message
    );
    assert.isNotEmpty(
      payload.input,
      webhookConstants.errorMessages.FFBWE0004.message
    );
    assert.isNotEmpty(
      payload.output,
      webhookConstants.errorMessages.FFBWE0005.message
    );
  });

  it("validate moduleName", () => {
    expect(payload.moduleName).to.be.oneOf(
      webhookConstants.TEST_CONSTANT.MODULE_NAME
    );
  });

  let response;
  before(async () => {
    response = await chai
      .request(server)
      .post("/fintech/finbingo/webhook")
      .send(payload);
  });

  it("Should have status code of 200", () => {
    expect(response).to.have.status(200);
  });

  it("Reponse should be of type object", () => {
    response.request.header.should.be.a("object");
  });

  it("Response should have properties code, message, data", () => {
    assert.hasAllKeys(response.body, ["code", "message", "data"]);
  });

  it("Data object should contain clientId key", () => {
    assert.hasAllKeys(response.body.data, ["clientId"]);
  });

  it("Data object should contain webhookDateTime key", () => {
    assert.hasAllKeys(response.body.data, ["webhookDateTime"]);
  });
});

// Api  : /fintech/finbingo/webhook
// Desc : Customer register api should return
//        error message and code
// Case : Invalid Payload With Missing Keys

describe("Case: Invalid Payload With Missing Keys", () => {
  const payload =
    webhookConstants.TEST_CONSTANT.INVALID_PAYLOAD_WITH_MISSING_KEYS;

  it("payload should be of type object", () => {
    expect(payload).to.be.a("object");
  });

  it("if payload does not contain mandatory fields", () => {
    assert.doesNotHaveAllKeys(
      payload,
      webhookConstants.TEST_CONSTANT.PAYLOAD_KEYS
    );
  });

  let response;
  before(async () => {
    response = await chai
      .request(server)
      .post("/fintech/finbingo/webhook")
      .send(payload);
  });

  it("Should have status code of 400", () => {
    expect(response).to.have.status(400);
  });

  it("Reponse should be of type object", () => {
    response.request.header.should.be.a("object");
  });

  it("Response should have property message", () => {
    assert.hasAllKeys(response.body, ["message"]);
  });
});

// Api  : /fintech/finbingo/webhook
// Desc : Customer register api should return
//        error message and code
// Case : Invalid Payload With Empty Values

describe("Case: Invalid Payload With Empty Values", () => {
  const payload =
    webhookConstants.TEST_CONSTANT.INVALID_PAYLOAD_WITH_EMPTY_VALUES;

  it("payload should be of type object", () => {
    expect(payload).to.be.a("object");
  });

  it("payload should contains mandatory fields", () => {
    assert.containsAllKeys(
      payload,
      webhookConstants.TEST_CONSTANT.PAYLOAD_KEYS
    );
  });

  it("mandatory fields should not be empty", () => {
    assert.isEmpty(
      payload.clientId,
      webhookConstants.errorMessages.FFBWE0001.message
    );
    assert.isEmpty(
      payload.moduleName,
      webhookConstants.errorMessages.FFBWE0002.message
    );
    assert.isEmpty(
      payload.input,
      webhookConstants.errorMessages.FFBWE0004.message
    );
    assert.isEmpty(
      payload.output,
      webhookConstants.errorMessages.FFBWE0005.message
    );
  });

  let response;
  before(async () => {
    response = await chai
      .request(server)
      .post("/fintech/finbingo/webhook")
      .send(payload);
  });

  it("Should have status code of 400", () => {
    expect(response).to.have.status(400);
  });

  it("Reponse should be of type object", () => {
    response.request.header.should.be.a("object");
  });

  it("Response should have property message,code", () => {
    assert.hasAllKeys(response.body, ["message", "code"]);
  });
});

// Api  : /fintech/finbingo/webhook
// Desc : Customer register api should return
//        error message and code
// Case : Invalid Payload With All Keys But Invalid Values
describe("Case: Invalid Payload With All Keys But Invalid Values", () => {
  const payload =
    webhookConstants.TEST_CONSTANT.PAYLOAD_WITH_All_KEYS_BUT_INVALID_VALUES;

  it("payload should be of type object", () => {
    expect(payload).to.be.a("object");
  });

  it("payload should contains mandatory fields", () => {
    assert.containsAllKeys(
      payload,
      webhookConstants.TEST_CONSTANT.PAYLOAD_KEYS
    );
  });

  it("mandatory fields should not be empty", () => {
    assert.isNotEmpty(
      payload.clientId,
      webhookConstants.errorMessages.FFBWE0001.message
    );
    assert.isNotEmpty(
      payload.moduleName,
      webhookConstants.errorMessages.FFBWE0002.message
    );
    assert.isNotEmpty(
      payload.input,
      webhookConstants.errorMessages.FFBWE0004.message
    );
    assert.isNotEmpty(
      payload.output,
      webhookConstants.errorMessages.FFBWE0005.message
    );
  });

  it("validate invalid moduleName", () => {
    expect(payload.moduleName).to.not.be.oneOf(
      webhookConstants.TEST_CONSTANT.MODULE_NAME
    );
  });

  let response;
  before(async () => {
    response = await chai
      .request(server)
      .post("/fintech/finbingo/webhook")
      .send(payload);
  });

  it("Should have status code of 400", () => {
    expect(response).to.have.status(400);
  });

  it("Reponse should be of type object", () => {
    response.request.header.should.be.a("object");
  });

  it("Response should have properties code, message", () => {
    assert.hasAllKeys(response.body, ["code", "message"]);
  });
});
