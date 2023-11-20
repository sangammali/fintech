const sharedConstants = require("shared/constants");

const goldenPiParsers = {};

goldenPiParsers.customerDetails = ({
	customerDetails
}) => {
	let result = {
		"meta": {
			"status": "success"
		},
	}
	result.data = [{
		"customerId": customerDetails.customer_ref_id ? customerDetails.customer_ref_id : "",
		"name": customerDetails.name ? customerDetails.name : "",
		"pan": customerDetails.pan ? customerDetails.pan : "",
		"email": customerDetails.email ? customerDetails.email : "",
		"phone": customerDetails.mobile ? customerDetails.mobile : "",
		"countryCode": 91,
		"address": customerDetails.address ? JSON.parse(customerDetails.address) : "",
		"bankName": customerDetails.bank_details ? customerDetails.bank_details[0].bank_name : "",
		"bankAcNumber": customerDetails.bank_details ? customerDetails.bank_details[0].account_number: "",
		"ifsc": customerDetails.bank_details ? customerDetails.bank_details[0].ifsc_code : "",
		"dpProvider": customerDetails.dp_details ? customerDetails.dp_details[0].dp_provider : "",
		"dpId": customerDetails.dp_id ? customerDetails.dp_details[0].dp_id: "",
		"clientId": customerDetails.customer_ref_id ? customerDetails.customer_ref_id : "",
		"poaGiven": "",
		"nri": "No",
		"nroNpis": "",
		"uccId": customerDetails.ucc_id ? customerDetails.ucc_id : "",
		"rmCode": customerDetails.rm_code ? customerDetails.rm_code : "",
	}];
	return result;
}

goldenPiParsers.emptyCustomerDetails = ({
	customerRefId
}) => {

	let data = {
		"customerId": customerRefId,
		"name": "",
		"pan": "",
		"email": "",
		"phone": "",
		"countryCode": "",
		"address": "",
		"bankName": "",
		"bankAcNumber": "",
		"ifsc": "",
		"dpProvider": "",
		"dpId": "",
		"clientId": "",
		"poaGiven": "",
		"nri": "",
		"nroNpis": "",
		"uccId": "",
		"rmCode": "",
	}

	return data;
}

module.exports = goldenPiParsers;
