const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("src/index.js");
const { expect, assert } = chai;
const sharedServices = require("shared/services");
const sharedConstants = require("shared/constants");
const commonConstants = require("../constants");

chai.should();
chai.use(chaiHttp);

// Api  : /common/consent-status
// Desc : Consent status api should mark consent
// Case : Positive
describe("Case: Postive", () => {
  let response;

  before(async () => {
    response = await chai
      .request(server)
      .post("/common/consent-status")
      .set({ "Authorization": commonConstants.consentStatus.TEST_CONSTANTS.VALID_TOKEN })
      .send(commonConstants.consentStatus.TEST_CONSTANTS.VALID_PAYLOAD);
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
});

// Api  : /common/consent-status
// Desc : Consent status api should not mark consent
// Case : Invalid token
describe("Case : Invalid token", () => {
  let response;

  before(async () => {
    response = await chai
      .request(server)
      .post("/common/consent-status")
      .set({ "Authorization": commonConstants.consentStatus.TEST_CONSTANTS.INVALID_TOKEN })
      .send(commonConstants.consentStatus.TEST_CONSTANTS.VALID_PAYLOAD);
  });

  it("Should have status code of 401", () => {
    expect(response).to.have.status(401);
  });

  it("Reponse should be of type object", () => {
    response.request.header.should.be.a("object");
  });

  it("Response should have properties code, message", () => {
    assert.hasAllKeys(response.body, ["code", "message"]);
  });
});

// Api  : /common/consent-status
// Desc : Consent status api should not mark consent
// Case : Invalid payload (fintechName missing)
describe("Case : Invalid payload (fintechName missing)", () => {
  let response;

  before(async () => {
    response = await chai
      .request(server)
      .post("/common/consent-status")
      .set({ "Authorization": commonConstants.consentStatus.TEST_CONSTANTS.VALID_TOKEN })
      .send(commonConstants.consentStatus.TEST_CONSTANTS.INVALID_PAYLOAD_1);
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

// Api  : /common/consent-status
// Desc : Consent status api should not mark consent
// Case : Invalid payload (userConsentStatus missing)
describe("Case : Invalid payload (userConsentStatus missing)", () => {
  let response;

  before(async () => {
    response = await chai
      .request(server)
      .post("/common/consent-status")
      .set({ "Authorization": commonConstants.consentStatus.TEST_CONSTANTS.VALID_TOKEN })
      .send(commonConstants.consentStatus.TEST_CONSTANTS.INVALID_PAYLOAD_2);
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
