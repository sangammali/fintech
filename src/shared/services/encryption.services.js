const crypto = require('crypto');
const sharedConstants = require("shared/constants");
const fs = require("fs");

const encryptionServices = {};
encryptionServices.encryptUsingRsaAlgorithm = (data) => {
	if (data) {
		const publicKey = fs.readFileSync(
			sharedConstants.appConfig.app.requestPublicKey
		);

		// Simulate sender encrypting data in chunks with RSA
		const requestPayload = data;
		const chunkSize = 256; // Size that fits within RSA limitations
		let chunks = "";

		for (let i = 0; i < requestPayload.length; i += chunkSize) {
			const chunk = requestPayload.slice(i, i + chunkSize);
			const encryptedChunk = crypto.publicEncrypt({
				key: publicKey,
				padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
			}, Buffer.from(chunk, 'utf-8'));
			chunks += (encryptedChunk.toString('base64') + '.');
		}
		return chunks.substring(0, chunks.length - 1);;
	}
}

encryptionServices.decryptUsingRsaAlgorithm = (data) => {
	if (data) {
		const privateKey = fs.readFileSync(
			sharedConstants.appConfig.app.requestPrivateKey
		);
		// Simulate receiver decrypting data chunks with RSA
		let decryptedChunks = "";
		data = data.split(".");

		for (const encryptedData of data) {
			let bufferData = Buffer.from(encryptedData, 'base64');
			const decryptedChunk = crypto.privateDecrypt({
				key: privateKey,
				padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
			}, bufferData);
			decryptedChunks += decryptedChunk.toString('utf-8');
		}

		const decryptedData = decryptedChunks;


		return JSON.parse(decryptedData);
	}
};


module.exports = encryptionServices;
