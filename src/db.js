import knex from 'knex';
import dotenv from 'dotenv';
dotenv.config();

export const db = knex({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST || 'projeto.cluster-custom-ctuciooo6jwt.us-east-1.rds.amazonaws.com',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'postgres',
    database: process.env.DB_NAME || 'sensors_db',
    ssl: { rejectUnauthorized: false } // necessário para conexão segura com o RDS
  },
  pool: { min: 0, max: 10 }
});
