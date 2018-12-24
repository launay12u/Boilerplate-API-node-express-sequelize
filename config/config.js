import Joi from 'joi';

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
    NODE_ENV: Joi.string()
        .allow(['development', 'production', 'test', 'provision'])
        .default('development'),
    PORT: Joi.number()
        .default(4000),
    API_VERSION: Joi.string()
        .default('1.0')
        .description('API Version'),
    JWT_SECRET: Joi.string().required()
        .description('JWT Secret required to sign'),
    MYSQL_ADDON_HOST: Joi.string().required()
        .description('DB HOST'),
    MYSQL_ADDON_PORT: Joi.number().required()
        .description('DB PORT'),
    MYSQL_ADDON_DB: Joi.string().required()
        .description('DB name'),
    MYSQL_ADDON_DB_TEST: Joi.string().required()
    .description('DB TEST name'),
    MYSQL_ADDON_USER: Joi.string().required()
        .description('DB USER'),
    MYSQL_ADDON_PASSWORD: Joi.string().required()
        .description('DB PASSWORD'),
}).unknown()
    .required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

// if test, use test database
const isTestEnvironment = envVars.NODE_ENV === 'test';

const config = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    apiVersion: envVars.API_VERSION,
    jwtSecret: envVars.JWT_SECRET,
    mysql: {
        db: isTestEnvironment ? envVars.MYSQL_ADDON_DB_TEST : envVars.MYSQL_ADDON_DB,
        port: envVars.MYSQL_ADDON_PORT,
        host: envVars.MYSQL_ADDON_HOST,
        user: envVars.MYSQL_ADDON_USER,
        password: envVars.MYSQL_ADDON_PASSWORD,
    },
};

export default config;
