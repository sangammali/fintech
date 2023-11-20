const config = {
  app: {
    environment: process.env.APP_ENVIRONMENT,
    name: process.env.APP_NAME,
    host: process.env.APP_HOST,
    port: process.env.APP_PORT,
    userJWTSecret: process.env.APP_USER_JWT_SECRET,
    userJWTExpiresIn: process.env.APP_USER_JWT_EXPIRESIN,
    privateKeyPath: process.env.APP_PRIVATE_KEY_PATH,
    requestPublicKey: process.env.APP_REQUEST_PUBLIC_KEY_PATH,
    requestPrivateKey: process.env.APP_REQUEST_PRIVATE_KEY_PATH,
    responsePublicKey: process.env.APP_RESPONSE_PUBLIC_KEY_PATH,
    responsePrivateKey: process.env.APP_RESPONSE_PRIVATE_KEY_PATH,
  },
  database: {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    name: process.env.DATABASE_NAME,
    debug: process.env.DATABASE_DEBUG,
    timezone: process.env.DATABASE_TIMEZONE,
  },
  aws: {
    s3: {
      key: process.env.FL_STRG_KEY,
      secret: process.env.FL_STRG_SECRET,
      bucketName: process.env.FL_STRG_NAME,
      folder_prefix: process.env.FL_STRG_FLDR_PREFIX,
    },
  },
  fintech: {
    tokenExpiryTime: process.env.FINTECH_TOKEN_EXPIRY_TIME,
  },
  finbingo: {
    moduleName: process.env.FNBNGO_MOD_NAME,
    jwtExpiresIn: process.env.FNBNGO_JWT_EXPIRESIN,
    jwtSecret: process.env.FNBNGO_JWT_SECRET,
    redirectionAfterJournetCompletion:
      process.env.FNBNGO_REDIRECTION_AFTER_JOURNEY_COMPLETION,
  },
  stockal: {
    jwtExpireTime: process.env.STOCKAL_JWT_EXPIRESIN,
    encryptionAlgo: process.env.STOCKAL_ENCRYPTION_ALGO,
    audience: process.env.STOCKAL_AUDIENCE,
    privateKey: process.env.STOCKAL_PRIVATE_KEY_PATH,
    publicKey: process.env.STOCKAL_PUBLIC_KEY_PATH,
  },
  IAM: {
    jwtSecret: process.env.IAM_JWT_SECRET,
    baseUrl: process.env.IAM_BASE_URL,
    apiKey: process.env.IAM_API_KEY,
    apiSecret: process.env.IAM_API_SECRET,
    tokenExpiryTime: process.env.IAM_TOKEN_EXPIRY,
  },
  goldenPi: {
    jwtExpiresIn: process.env.GOLDENPI_JWT_EXPIRESIN,
    jwtSecret: process.env.GOLDENPI_JWT_SECRET,
    pid: process.env.GOLDENPI_PID,
  },
  jarvis: {
    jwtExpiresIn: process.env.JARVIS_JWT_EXPIRESIN,
    jwtSecret: process.env.JARVIS_JWT_SECRET,
    redirectionAfterJournetCompletion:
      process.env.JARVIS_REDIRECTION_AFTER_JOURNEY_COMPLETION,
  },
};

module.exports = config;
