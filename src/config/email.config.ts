import { registerAs } from '@nestjs/config';

export const emailConfig = registerAs('email', () => ({
  email_host: process.env.EMAIL_HOST,
  email_port: process.env.EMAIL_PORT,
  email_user: process.env.EMAIL_USER,
  email_pass: process.env.EMAIL_PASS,
}));
