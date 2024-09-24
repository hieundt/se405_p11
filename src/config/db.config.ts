import { registerAs } from '@nestjs/config';

export const mongoConfig = registerAs('mongo', () => ({
  host: process.env.MONGO_HOST,
  dbname: process.env.MONGO_DBNAME,
  username: process.env.MONGO_USERNAME,
  password: process.env.MONGO_PASSWORD,
}));
