const sharedServices = require("shared/services");
const loggerServices = require("shared/services/logger.services");
const generateRedirectionLink = require("./generateRedirectionLink.service");
const centrumServices = require("app_modules/common/services/centrum.services");
const iamServices = require("app_modules/common/services/iam.services");
const sharedModels = require("shared/models");
const sharedConstants = require("shared/constants");
const stockalConstants = require("../constants");
const stockalParser = require("../parser");

const FormData = require("form-data");
const fs = require("fs");
const axios = require("axios");

module.exports = async ({ customerRefId, customerId, planId, requestId }) => {
  loggerServices.success.info({
    requestId,
    stage: "Stockal redirect - Request params",
    msg: "Params recieved",
    customerId,
    customerRefId,
    planId,
  });

  let stockalCustomerId;

  // get fintech details
  const fintechDetails = await sharedModels.fintech.read({
    fintechName: sharedConstants.masterConstants.FINTECH.STOCKAL,
  });

  const { fintechId, appKey, appSecret, fintechPartnerId } = fintechDetails[0];

  // get fintech config
  const fintechConfig = await sharedModels.fintechConfig.read({
    fintechId,
  });

  // check whether customer is new or old
  const isCustomerLinked = await sharedModels.fintechCustomerLinking.read({
    customerId,
    fintechId,
  });

  // Existing customer
  if (isCustomerLinked.length) {
    // get stockal customer id
    const stockalCustomerLinking =
      await sharedModels.fintechCustomerLinking.read({ customerId, fintechId });
    const { fintechCustomerId } = stockalCustomerLinking[0];
    stockalCustomerId = fintechCustomerId;

    loggerServices.success.info({
      requestId,
      stage: "Stockal redirect - Customer linked",
      msg: "Customer is linked with stockal",
      customerId,
      customerRefId,
      fintechId,
      stockalCustomerId,
    });
  } else {
    // New customer
    // get customer details
    const customerDetails = await iamServices.getUserDetails(
      customerRefId,
      stockalConstants.redirect.requestedData.createCustomer
    );

    loggerServices.success.info({
      requestId,
      stage: "Stockal redirect - Customer not linked",
      msg: "Got customer details",
      customerDetails,
    });

    // generate auth key
    const authKeyConfig = fintechConfig.filter(
      (e) => e.apiName == stockalConstants.redirect.apiName.generateAuthKey
    );

    const { apiEndpoint: generateAuthKeyApi } = authKeyConfig[0];

    const generateAuthKeyUrl = generateAuthKeyApi;
    const generateAuthKeyHeaders = {
      accept: "application/json",
      "api-key": appKey,
      "access-key": appSecret,
    };

    let authKey;

    const generateAuthKey = await axios.get(generateAuthKeyUrl, {
      headers: generateAuthKeyHeaders,
    });

    if (generateAuthKey.status == 200) {
      // await sharedServices.dbLoggerServices.log({
      //   fintechId: fintechId,
      //   customerId: customerId,
      //   action: stockalConstants.redirect.action.GENERATE_AUTH_KEY,
      //   request: { generateAuthKeyUrl },
      //   response: generateAuthKey,
      //   code: generateAuthKey.status,
      // });

      authKey = generateAuthKey.data.authKey;
    } else {
      // await sharedServices.dbLoggerServices.log({
      //   fintechId: fintechId,
      //   customerId: customerId,
      //   action: stockalConstants.redirect.action.GENERATE_AUTH_KEY,
      //   request: { generateAuthKeyUrl },
      //   response: generateAuthKey,
      //   code: generateAuthKey.status,
      // });

      return sharedServices.error.throw(
        stockalConstants.redirect.errorMessages.FSAE0005
      );
    }

    // get documents from centrum
    const documents = await centrumServices.getDocuments(customerRefId);

    loggerServices.success.info({
      requestId,
      stage: "Stockal redirect - Centrum documents",
      msg: "Got documents from centrum",
      customerRefId,
      documents,
    });

    let uploadedDocs = [];

    // get upload document config
    const uploadDocConfig = fintechConfig.filter(
      (e) => e.apiName == stockalConstants.redirect.apiName.uploadDoc
    );
    const { apiEndpoint: uploadDocApi } = uploadDocConfig[0];

    // upload the document to stockal and get document ID
    for (document of documents) {
      const { proofType, docSide, docType, docData } = document;

      // get file path
      const filePath = await sharedServices.fileServices.saveBase64toFile({
        fileName: `${proofType}_${docSide}_${docType}`,
        base64Data: docData,
      });

      loggerServices.success.info({
        requestId,
        stage: "Stockal redirect - Save file",
        msg: "Data saved from base64 to file",
        filePath,
        document,
      });

      if (filePath) {
        let data = new FormData();
        data.append("file", fs.createReadStream(filePath));

        // upload file
        const options = {
          method: "post",
          url: uploadDocApi,
          headers: {
            accept: "application/json",
            "content-type": "application/json",
            "api-key": appKey,
            "auth-key": authKey,
            ...data.getHeaders(),
          },
          data: data,
        };
        let docId;

        const uploadDoc = await axios.request(options);
        // const uploadDoc = {
        //   status: 200,
        //   data: {
        //     doc: {
        //       docId: "DOC-123"
        //     }
        //   }
        // }

        // delete the created file
        await sharedServices.fileServices.deleteFile(filePath);

        if (uploadDoc.status == 200) {
          // await sharedServices.dbLoggerServices.log({
          //   fintechId,
          //   customerId,
          //   action: stockalConstants.redirect.action.UPLOAD_DOCUMENT,
          //   request: options,
          //   response: uploadDoc,
          //   code: uploadDoc.status,
          // });

          docId = uploadDoc.data.doc.docId;
        } else {
          // await sharedServices.dbLoggerServices.log({
          //   fintechId,
          //   customerId,
          //   action: stockalConstants.redirect.action.UPLOAD_DOCUMENT,
          //   request: options,
          //   response: uploadDoc,
          //   code: uploadDoc.status,
          // });

          loggerServices.error.error({
            requestId,
            stage: "Stockal redirect - upload document",
            msg: "Failed to upload document",
            filePath,
            document,
          });

          sharedServices.error.throw(
            stockalConstants.redirect.errorMessages.FSAE0006
          );
        }

        // push data in uploadedDocs array
        uploadedDocs.push({
          docId: docId,
          proofType: document.proofType,
          docSide: document.docSide,
          docType: document.docType,
        });
      }
    }

    customerDetails["documents"] = uploadedDocs;

    // parse customer details
    const parsedCustomerDetails = stockalParser.customerDetailsParser({
      customerRefId,
      customerDetails,
    });

    loggerServices.success.info({
      requestId,
      stage: "Stockal redirect - Customer details",
      msg: "Parsed customer details",
      customerDetails: parsedCustomerDetails,
    });

    // get fintech config for create customer
    const createCustomerConfig = fintechConfig.filter(
      (e) => e.apiName == stockalConstants.redirect.apiName.createCustomer
    );

    const { apiEndpoint: createCustomerApi } = createCustomerConfig[0];

    // create customer ---
    const createCustomerRequestUrl = createCustomerApi;
    const createCustomerPayload = JSON.stringify(parsedCustomerDetails);
    const headers = {
      accept: "application/json",
      "content-type": "application/json",
      "api-key": appKey,
      "auth-key": authKey,
    };

    const createCustomer = await axios.post(
      createCustomerRequestUrl,
      createCustomerPayload,
      { headers }
    );

    // const createCustomer = {
    //   status: 200,
    //   doc: {
    //     customerId: "21197a8e-xyz-xyz-xyz-3875459cd752",
    //   }
    // }

    if (createCustomer.status == 200) {
      // await sharedServices.dbLoggerServices.log({
      //   fintechId,
      //   customerId,
      //   action: stockalConstants.redirect.action.CREATE_CUSTOMER,
      //   request: { createCustomerRequestUrl, parsedCustomerDetails , headers },
      //   response: createCustomer,
      //   code: createCustomer.status,
      // });

      stockalCustomerId = createCustomer.doc.customerId;
    } else {
      // await sharedServices.dbLoggerServices.log({
      //   fintechId,
      //   customerId,
      //   action: stockalConstants.redirect.action.CREATE_CUSTOMER,
      //   request: { createCustomerRequestUrl, parsedCustomerDetails , headers },
      //   response: createCustomer,
      //   code: createCustomer.status,
      // });

      // throw error failed to create user
      return sharedServices.error.throw(
        stockalConstants.redirect.errorMessages.FSAE0002
      );
    }

    // create subscription ---
    const createSubConfig = fintechConfig.filter(
      (e) => e.apiName == stockalConstants.redirect.apiName.createSub
    );
    const { apiEndpoint: createSubApi } = createSubConfig[0];

    const createSubRequestUrl = createSubApi;
    const createSubPayload = JSON.stringify({
      customerId: stockalCustomerId,
      planId: planId,
    });

    // const createSub = await axios.post(createSubRequestUrl, createSubPayload, {
    //   headers,
    // });

    const createSub = {
      status: 200,
    };

    if (createSub.status !== 200) {
      // await sharedServices.dbLoggerServices.log({
      //   fintechId,
      //   customerId,
      //   action: stockalConstants.redirect.action.CREATE_SUBSCRIPTION,
      //   request: { createSubRequestUrl, customerId: stockalCustomerId, planId: planId, headers },
      //   response: createSub,
      //   code: createSub.status,
      // });

      return sharedServices.error.throw(
        stockalConstants.redirect.errorMessages.FSAE0003
      );
    }

    // await sharedServices.dbLoggerServices.log({
    //   fintechId,
    //   customerId,
    //   action: stockalConstants.redirect.action.CREATE_SUBSCRIPTION,
    //   request: { createSubRequestUrl, customerId: stockalCustomerId, planId: planId, headers },
    //   response: createSub,
    //   code: createSub.status,
    // });

    // create customer fintech linking ---
    await sharedModels.fintechCustomerLinking.create(
      fintechId,
      customerId,
      stockalCustomerId,
      ""
    );
  }

  // get stockal authcode api config
  const generateAuthCodeConfig = fintechConfig.filter(
    (e) => e.apiName == stockalConstants.redirect.apiName.generateAuthCode
  );
  const { apiEndpoint: generateAuthCodeApi } = generateAuthCodeConfig[0];

  // get stockal redirect api config
  const redirectConfig = fintechConfig.filter(
    (e) => e.apiName == stockalConstants.redirect.apiName.redirect
  );

  const { apiEndpoint: redirectEndpoint } = redirectConfig[0];

  // generate redirection link
  const redirectionURI = await generateRedirectionLink({
    stockalCustomerId,
    generateAuthCodeApi,
    redirectEndpoint,
    clientSecret: appSecret,
    clientId: appKey,
    fintechPartnerId,
    requestId,
  });

  loggerServices.success.info({
    requestId,
    stage: "Stockal redirect - Generate redirection URL",
    msg: "Redirection URL generated successfully",
    redirectionURL: redirectionURI,
  });

  return { redirectionURI };
};
