import * as dotenv from 'dotenv';

dotenv.config();

export const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 3000,
  dbUrl: process.env.DATABASE_URL,
};

// module.exports = { config };
