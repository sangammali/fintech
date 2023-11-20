module.exports = {
	messages: {
		FDPS1001: {
			code: "FDPS1001",
			statusCode: 200,
			message: "Customer details retrieved successfully",
		},
	},
	errorMessages: {
		FGPE1001: {
			code: "FGPE1001",
			statusCode: 400,
			message: "Token not found",
		},
		FGPE1002: {
			code: "FGPE1002",
			statusCode: 400,
			message: "Customer details not found",
		},
		FGPE1003: {
			code: "FGPE1003",
			statusCode: 400,
			message: "Token invalid or expired",
		}
	},
	consentStatus: {
		APPROVED: "APPROVED",
	},
	requestedData: {
		customerDetails: [
			"customer_ref_id",
			"name",
			"pan",
			"email",
			"mobile",
			"countryCode",
			"address",
			"bank_name",
			"account_number",
			"ifsc_code",
			"dp_provider",
			"dp_id",
			"clientId",
			"poaGiven",
			"nri",
			"nroNpis",
			"ucc_id",
			"rm_code",
		]
	},
	tokenExpiredError: "TokenExpiredError",
	tokenInvalidError: "JsonWebTokenError",
	TEST_CONSTANTS: {
		VALID_TOKEN_WITH_CONSENT: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lclJlZklkIjoiMzBlYWRkZjUtZGNmYS00ZDJkLWJkNWYtMTdmZmNkNTNjMDc5IiwiY3VzdG9tZXJJZCI6MTIsImZpbnRlY2hJZCI6NCwiaWF0IjoxNjk1MzYwNzMwLCJleHAiOjE5NTQ1NjA3MzB9.C40iDHG10nEe4t0wF-XjRhJs3mrAFnSSNqFPl3aSfbU",
		INVALID_TOKEN: "invalid token",
	}
};
