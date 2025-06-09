
import { config as dotenvConfig } from 'dotenv';
dotenvConfig({ path: '.env' });

export default {
  api_port: +`${process.env.API_PORT}`,
  api_url: `${process.env.API_URL}`,

  recaptcha_secret_key: process.env.RECAPTCHA_SECRET_KEY as string,
  recaptcha_api_url: process.env.RECAPTCHA_API_URL as string,

  postgres_host: process.env.POSTGRES_HOST,
  postgres_port: process.env.POSTGRES_PORT,
  postgres_database: process.env.POSTGRES_DATABASE,
  postgres_username: process.env.POSTGRES_USERNAME,
  postgres_password: process.env.POSTGRES_PASSWORD,

  sendgrid_api_key: process.env.SENDGRID_API_KEY,
  from_email: process.env.FROM_EMAIL,
  target_email: process.env.TARGET_EMAIL
};