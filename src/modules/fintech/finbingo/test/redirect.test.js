const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("src/index.js");
const { expect, assert } = chai;
const sharedServices = require("shared/services");
const sharedConstants = require("shared/constants");
const redirectConstants = require("../constants/redirect.constants");

chai.should();
chai.use(chaiHttp);

// Api  : /fintech/finbingo/redirect
// Desc : Finbingo redirect api should return
//        redirectionURI in result
// Case : Positive
describe("Case: Postive", () => {
  let response;

  before(async () => {
    response = await chai
      .request(server)
      .get("/fintech/finbingo/redirect")
      .set({ "Authorization": redirectConstants.TEST_CONSTANTS.VALID_TOKEN });
  });


  it("Should have authorization key in header", () => {
    response.request.header.should.have.property('Authorization');
  });

  it("Decoded JWT should have customerRefId and customerId", () => {
    const decodedToken = sharedServices.authServices.validateJWT(
      response.request.header.Authorization,
      sharedConstants.appConfig.IAM.jwtSecret
    );

    assert.containsAllKeys(decodedToken, ["customerRefId", "customerId"]);
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

  it("Result object should contain redirectionURI key", () => {
    assert.hasAllKeys(response.body.result, ["redirectionURI"]);
  });

  it("RedirectionURI should be string", () => {
    assert.isString(response.body.result.redirectionURI);
  });

  it("Redirection URL should match the URL format", () => {
    expect(sharedServices.mysqlHelperServices.isValidURL(response.body.result.redirectionURI)).to.equal(true);
  });
});

// Api  : /fintech/finbingo/redirect
// Desc : Finbingo redirect api should return
//        error message and code
// Case : Invalid token
describe("Case : Invalid token", () => {
  let response;

  before(async () => {
    response = await chai
      .request(server)
      .get("/fintech/finbingo/redirect")
      .set({ "Authorization": redirectConstants.TEST_CONSTANTS.INVALID_TOKEN });
  });


  it("Should have authorization key in header", () => {
    response.request.header.should.have.property('Authorization');
  });

  it("Decoded JWT should be null", () => {
    const decodedToken = sharedServices.authServices.decodeJWT(
      response.request.header.Authorization,
      sharedConstants.appConfig.IAM.jwtSecret
    );

    assert.isNull(decodedToken);
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
