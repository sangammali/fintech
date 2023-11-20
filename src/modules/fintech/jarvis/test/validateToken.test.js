const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("src/index.js");
const { expect, assert } = chai;
const sharedServices = require("shared/services");
const sharedConstants = require("shared/constants");
const validateTokenConstants = require("../constants/validateToken.constants");

chai.should();
chai.use(chaiHttp);

// Api  : /fintech/jarvis/validate-token
// Desc : Jarvis validate token api should return
//        customer details in result
// Case : Positive (With Consent)
describe("Case: Postive (With Consent)", () => {
  let response;

  before(async () => {
    response = await chai
      .request(server)
      .get("/fintech/jarvis/validate-token")
      .set({
        token: validateTokenConstants.TEST_CONSTANTS.VALID_TOKEN_WITH_CONSENT,
      });
  });

  it("Should have token key in header", () => {
    response.request.header.should.have.property("token");
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

  it("Result should contain client info", () => {
    assert.hasAllKeys(response.body.data[0], [
      "centrumCustomerRefId",
      "fullName",
      "email",
      "mobile",
      "pan",
      "dob",
      "RedirectionURLPostUserJourneyCompletion",
    ]);
  });

  it("centrumCustomerRefId should be a string", () => {
    assert.isString(response.body.data[0].centrumCustomerRefId);
  });

  it("fullName should be a string", () => {
    assert.isString(response.body.data[0].fullName);
  });

  it("Email should be a string", () => {
    assert.isString(response.body.data[0].email);
  });

  it("Mobile should be a string", () => {
    assert.isString(response.body.data[0].mobile);
  });

  it("Pan should be a string", () => {
    assert.isString(response.body.data[0].pan);
  });

  it("DOB should be a string", () => {
    assert.isString(response.body.data[0].dob);
  });

  it("RedirectionURLPostUserJourneyCompletion should be a string", () => {
    assert.isString(
      response.body.data[0].RedirectionURLPostUserJourneyCompletion
    );
  });

  it("RedirectionURLPostUserJourneyCompletion should be a of URL format", () => {
    expect(
      sharedServices.mysqlHelperServices.isValidURL(
        response.body.data[0].RedirectionURLPostUserJourneyCompletion
      )
    ).to.equal(true);
  });
});

// Api  : /fintech/jarvis/validate-token
// Desc : Jarvis validate token api should return
//        error message and code
// Case : Positive (Without Consent)
describe("Case : Positive (Without Consent)", () => {
  let response;

  before(async () => {
    response = await chai
      .request(server)
      .get("/fintech/jarvis/validate-token")
      .set({
        token:
          validateTokenConstants.TEST_CONSTANTS.VALID_TOKEN_WITHOUT_CONSENT,
      });
  });

  it("Should have token key in header", () => {
    response.request.header.should.have.property("token");
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

  it("Result should contain client info", () => {
    assert.hasAllKeys(response.body.data[0], [
      "centrumCustomerRefId",
      "fullName",
      "email",
      "mobile",
      "pan",
      "dob",
      "RedirectionURLPostUserJourneyCompletion",
    ]);
  });

  it("centrumCustomerRefId id should be a string", () => {
    assert.isString(response.body.data[0].centrumCustomerRefId);
  });

  it("centrumCustomerRefId id should be a string", () => {
    assert.isEmpty(response.body.data[0].centrumCustomerRefId);
  });

  it("fullName should be a string", () => {
    assert.isString(response.body.data[0].fullName);
  });

  it("Name should be empty", () => {
    assert.isEmpty(response.body.data[0].fullName);
  });

  it("Email should be a string", () => {
    assert.isString(response.body.data[0].email);
  });

  it("Email should be empty", () => {
    assert.isEmpty(response.body.data[0].email);
  });

  it("Mobile should be a string", () => {
    assert.isString(response.body.data[0].mobile);
  });

  it("Mobile should be empty", () => {
    assert.isEmpty(response.body.data[0].mobile);
  });

  it("PAN should be a string", () => {
    assert.isString(response.body.data[0].pan);
  });

  it("PAN should be empty", () => {
    assert.isEmpty(response.body.data[0].pan);
  });

  it("dob should be a string", () => {
    assert.isString(response.body.data[0].dob);
  });

  it("dob should be empty", () => {
    assert.isEmpty(response.body.data[0].dob);
  });

  it("RedirectionURLPostUserJourneyCompletion should be a string", () => {
    assert.isString(
      response.body.data[0].RedirectionURLPostUserJourneyCompletion
    );
  });

  it("RedirectionURLPostUserJourneyCompletion should be a of URL format", () => {
    expect(
      sharedServices.mysqlHelperServices.isValidURL(
        response.body.data[0].RedirectionURLPostUserJourneyCompletion
      )
    ).to.equal(true);
  });
});

// Api  : /fintech/jarvis/validate-token
// Desc : Jarvis validate token api should return
//        error message and code
// Case : Invalid token
describe("Case : Invalid token", () => {
  let response;

  before(async () => {
    response = await chai
      .request(server)
      .get("/fintech/jarvis/validate-token")
      .set({ token: validateTokenConstants.TEST_CONSTANTS.INVALID_TOKEN });
  });

  it("Should have token key in header", () => {
    response.request.header.should.have.property("token");
  });

  it("Should have status code of 400", () => {
    expect(response).to.have.status(400);
  });

  it("Reponse should be of type object", () => {
    response.request.header.should.be.a("object");
  });

  it("Response should have properties code, message, data", () => {
    assert.hasAllKeys(response.body, ["code", "message", "data"]);
  });
});
