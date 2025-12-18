"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: '.env' });
exports.default = {
    api_port: +`${process.env.API_PORT}`,
    api_url: `${process.env.API_URL}`,
    recaptcha_secret_key: process.env.RECAPTCHA_SECRET_KEY,
    recaptcha_api_url: process.env.RECAPTCHA_API_URL,
    postgres_host: process.env.POSTGRES_HOST,
    postgres_port: process.env.POSTGRES_PORT,
    postgres_database: process.env.POSTGRES_DATABASE,
    postgres_username: process.env.POSTGRES_USERNAME,
    postgres_password: process.env.POSTGRES_PASSWORD,
    sendgrid_api_key: process.env.SENDGRID_API_KEY,
    from_email: process.env.FROM_EMAIL,
    target_email: process.env.TARGET_EMAIL,
    telegram_api_url: process.env.TELEGRAM_API_URL,
    telegram_channel_id: process.env.TELEGRAM_CHANNEL_ID
};
//# sourceMappingURL=main.config.js.map