const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("src/index.js");
const { expect, assert } = chai;
const sharedServices = require("shared/services");
const sharedConstants = require("shared/constants");
const validateTokenConstants = require("../constants/validateToken.constants");

chai.should();
chai.use(chaiHttp);

// Api  : /fintech/goldenPi/validate-token
// Desc : GoldenPi validate token api should return
//        customer details in result
// Case : Positive (With Consent)
describe("Case: Postive (With Consent)", () => {
  let response;

  before(async () => {
    response = await chai
      .request(server)
      .get("/fintech/goldenPi/validate-token")
      .set({ "token": validateTokenConstants.TEST_CONSTANTS.VALID_TOKEN_WITH_CONSENT });
  });


  it("Should have token key in header", () => {
    response.request.header.should.have.property('token');
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

  it("Result should contain meta and data keys", () => {
    assert.hasAllKeys(response.body.result[0],
      [
        "meta",
        "data"
      ]
    );
  });

  it("Data should contain client info", () => {
    assert.hasAllKeys(response.body.result[0].data[0],
      [
        "customerId",
        "name",
        "pan",
        "email",
        "phone",
        "countryCode",
        "address",
        "bankName",
        "bankAcNumber",
        "ifsc",
        "dpProvider",
        "dpId",
        "clientId",
        "poaGiven",
        "nri",
        "nroNpis",
        "uccId",
        "rmCode"
      ]);
  });

  it("customerId should be a string", () => {
    assert.isString(response.body.result[0].data[0].customerId);
  });

  it("name should be a string", () => {
    assert.isString(response.body.result[0].data[0].name);
  });

  it("pan should be a string", () => {
    assert.isString(response.body.result[0].data[0].pan);
  });

  it("email should be a string", () => {
    assert.isString(response.body.result[0].data[0].email);
  });

  it("phone should be a string", () => {
    assert.isString(response.body.result[0].data[0].phone);
  });

  it("countryCode should be a number", () => {
    assert.isNumber(response.body.result[0].data[0].countryCode);
  });

  it("address should be a object", () => {
    assert.isObject(response.body.result[0].data[0].address);
  });

  it("address should be a all required keys", () => {
    assert.hasAllKeys(response.body.result[0].data[0].address, [
      "address_line_1",
      "address_line_2",
      "address_line_3",
      "city",
      "country",
      "pin_code",
      "state"
    ]);
  });

  it("bankName should be a string", () => {
    assert.isString(response.body.result[0].data[0].bankName);
  });

  it("bankAcNumber should be a string", () => {
    assert.isString(response.body.result[0].data[0].bankAcNumber);
  });

  it("ifsc should be a string", () => {
    assert.isString(response.body.result[0].data[0].ifsc);
  });

  it("dpProvider should be a string", () => {
    assert.isString(response.body.result[0].data[0].dpProvider);
  });

  it("dpId should be a string", () => {
    assert.isString(response.body.result[0].data[0].dpId);
  });

  it("clientId should be a string", () => {
    assert.isString(response.body.result[0].data[0].clientId);
  });

  it("poaGiven should be a string", () => {
    assert.isString(response.body.result[0].data[0].poaGiven);
  });

  it("nri should be a string", () => {
    assert.isString(response.body.result[0].data[0].nri);
  });

  it("nroNpis should be a string", () => {
    assert.isString(response.body.result[0].data[0].nroNpis);
  });

  it("uccId should be a string", () => {
    assert.isString(response.body.result[0].data[0].uccId);
  });

  it("rmCode should be a string", () => {
    assert.isString(response.body.result[0].data[0].rmCode);
  });
});

// Api  : /fintech/goldenPi/validate-token
// Desc : GoldenPi validate token api should return
//        error message and code
// Case : Invalid token
describe("Case : Invalid token", () => {
  let response;

  before(async () => {
    response = await chai
      .request(server)
      .get("/fintech/goldenPi/validate-token")
      .set({ "token": validateTokenConstants.TEST_CONSTANTS.INVALID_TOKEN });
  });


  it("Should have token key in header", () => {
    response.request.header.should.have.property('token');
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
