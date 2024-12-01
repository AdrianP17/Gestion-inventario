// Conexion a la base de datos PostgreSQL
// Implementar los repositorios para PostgreSQL
import { Pool } from 'pg';

export const db = new Pool({
host: process.env.POSTGRESQL_HOST,
  user: process.env.POSTGRESQL_USER,
  password: process.env.POSTGRESQL_PASSWORD,
  database: process.env.POSTGRESQL_DB,
  port: Number(process.env.POSTGRESQL_PORT,), 
  max: 10, // Número máximo de conexiones en el pool
  idleTimeoutMillis: 30000, // Tiempo de espera antes de cerrar una conexión inactiva
  connectionTimeoutMillis: 2000, // Tiempo de espera para establecer una nueva conexión
});
