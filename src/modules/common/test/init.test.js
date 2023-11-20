const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("src/index.js");
const { expect, assert } = chai;
const sharedServices = require("shared/services");
const sharedConstants = require("shared/constants");
const commonConstants = require("../constants");

chai.should();
chai.use(chaiHttp);

// Api  : /common/init
// Desc : Init api should return
//        customer consent, fintech and token in result
// Case : Positive
describe("Case: Postive", () => {
  let response;

  before(async () => {
    response = await chai
      .request(server)
      .get("/common/init")
      .query({ "authkey": commonConstants.init.TEST_CONSTANTS.AUTH_KEY });
  });

  it("Should have status code of 200", () => {
    expect(response).to.have.status(200);
  });

  it("Reponse should be of type object", () => {
    response.request.header.should.be.a("object");
  });

  it("Response should have properties code, message, result", () => {
    assert.hasAllKeys(response.body, ["code", "message", "result"]);
  });

  it("Result object should contain userConsentStatus, token, fintech, planId key", () => {
    assert.hasAllKeys(response.body.result, [
      "userConsentStatus",
      "token",
      "fintech",
      "planId"
    ]);
  });

  it("userConsentStatus should be boolean", () => {
    assert.isBoolean(response.body.result.userConsentStatus);
  });

  it("token should be string", () => {
    assert.isString(response.body.result.token);
  });

  it("token should not be empty", () => {
    assert.isNotEmpty(response.body.result.token);
  });

  it("fintech should be string", () => {
    assert.isString(response.body.result.fintech);
  });

  it("fintech should not be empty", () => {
    assert.isNotEmpty(response.body.result.fintech);
  });

  it("planId should be string", () => {
    assert.isString(response.body.result.planId);
  });
});

// Api  : /common/init
// Desc : Init api should return
//        error message and code
// Case : Invalid token
describe("Case : Invalid token", () => {
  let response;

  before(async () => {
    response = await chai
      .request(server)
      .get("/common/init")
      .query({ "authkey": commonConstants.init.TEST_CONSTANTS.INVALID_AUTH_KEY });
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
