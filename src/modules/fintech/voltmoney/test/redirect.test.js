const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("src/index.js");
const { expect, assert } = chai;
const sharedServices = require("shared/services");
const sharedConstants = require("shared/constants");
const redirectConstants = require("../constants/redirect.constants");

chai.should();
chai.use(chaiHttp);

// Api  : /fintech/volt-money/redirect
// Desc : Voltmoney redirect api should return
//        redirectionURI in result
// Case : Positive
describe("Case: Postive", () => {
  let response;

  before(async () => {
    response = await chai
      .request(server)
      .get("/fintech/volt-money/redirect")
      .set({ "Authorization": redirectConstants.TEST_CONSTANTS.VALID_TOKEN });
  });

  it("Should have authorization key in header", () => {
    response.request.header.should.have.property('Authorization');
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

  it("Result should have keys voltPlatformCode, customerSsoToken, customerCode, authToken", () => {
    assert.hasAllKeys(response.body.result, [
      "voltPlatformCode",
      "customerSsoToken",
      "customerCode",
      "authToken"
    ]);
  });

  it("voltPlatformCode should be string", () => {
    assert.isString(response.body.result.voltPlatformCode);
  });

  it("voltPlatformCode should not be empty", () => {
    assert.isNotEmpty(response.body.result.voltPlatformCode);
  });

  it("customerSsoToken should be string", () => {
    assert.isString(response.body.result.customerSsoToken);
  });

  it("customerSsoToken should not be empty", () => {
    assert.isNotEmpty(response.body.result.customerSsoToken);
  });

  it("customerCode should be string", () => {
    assert.isString(response.body.result.customerCode);
  });

  it("customerCode should not be empty", () => {
    assert.isNotEmpty(response.body.result.customerCode);
  });

  it("authToken should be string", () => {
    assert.isString(response.body.result.authToken);
  });

  it("authToken should not be empty", () => {
    assert.isNotEmpty(response.body.result.authToken);
  });
});

// Api  : /fintech/volt-money/redirect
// Desc : Voltmoney redirect api should return
//        error message and code
// Case : Invalid token
describe("Case : Invalid token", () => {
  let response;

  before(async () => {
    response = await chai
      .request(server)
      .get("/fintech/volt-money/redirect")
      .set({ "Authorization": redirectConstants.TEST_CONSTANTS.INVALID_TOKEN });
  });

  it("Should have authorization key in header", () => {
    response.request.header.should.have.property('Authorization');
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
