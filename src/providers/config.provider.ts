import dotenv from 'dotenv';
dotenv.config();

export const config = {
  NODE_ENV: process.env.NODE_ENV,
  PUBLIC_API_PORT: process.env.PUBLIC_API_PORT,
  ADMIN_API_PORT: process.env.ADMIN_API_PORT,
  USER_API_PORT: process.env.USER_API_PORT,
}
