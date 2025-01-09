// Conexion a la base de datos PostgreSQL
// Implementar los repositorios para PostgreSQL
import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();
export const db = new Pool({
  host: process.env.POSTGRESQL_HOST,
  user: process.env.POSTGRESQL_USER,
  password: process.env.POSTGRESQL_PASSWORD,
  database: process.env.POSTGRESQL_DB,
  port: Number(process.env.POSTGRESQL_PORT,), 
  max: 10, 
  idleTimeoutMillis: 30000, 
  connectionTimeoutMillis: 2000, 
});
