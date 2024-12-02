// Conexion a la base de datos PostgreSQL
// Implementar los repositorios para PostgreSQL
import { Pool } from 'pg';

export const db = new Pool({
  host: 'localhost', 
  user: 'postgres',
  password: '1234',
  database: 'bbdd_inventario',
  port: 5432, 
  max: 10, 
  idleTimeoutMillis: 30000, 
  connectionTimeoutMillis: 2000, 
});
