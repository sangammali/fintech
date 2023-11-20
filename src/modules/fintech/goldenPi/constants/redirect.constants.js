module.exports = {
	messages: {
		FGPS0001: {
			code: "FGPS0001",
			statusCode: 200,
			message: "Redirection URL generated successfully",
		},
	},
	errorMessages: {
		FGPE0001: {
			code: "FGPE0001",
			statusCode: 400,
			message: "Customer reference id not found",
		},
		FGPE0002: {
			code: "FGPE0002",
			statusCode: 400,
			message: "Customer id not found",
		},
	},
	apiName: {
		redirectApi: "goldenPi-redirect",
	},
	TEST_CONSTANTS: {
		VALID_TOKEN: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcklkIjoxMiwiY3VzdG9tZXJSZWZJZCI6IjMwZWFkZGY1LWRjZmEtNGQyZC1iZDVmLTE3ZmZjZDUzYzA3OSIsImlhdCI6MTY5NTM1NzYxNywiZXhwIjoxOTU0NTU3NjE3fQ.ADnnkXqSShOufXjmL37N-DB-fT6ff7lCNNpHEDbpStM",
		INVALID_TOKEN: "invalid token",
	}
};
