import knex from 'knex';
import dotenv from 'dotenv';
dotenv.config();

export const db = knex({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'postgres',
    database: process.env.DB_NAME || 'sensors_db'
  },
  pool: { min: 0, max: 10 }
});
