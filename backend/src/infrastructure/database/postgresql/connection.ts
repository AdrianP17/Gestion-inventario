// Conexion a la base de datos PostgreSQL
// Implementar los repositorios para PostgreSQL
import { Pool } from 'pg';

export const db = new Pool({
  host: 'localhost', // Cambia según la configuración de tu servidor PostgreSQL
  user: 'postgres',
  password: '1234', // Cambia según tus credenciales
  database: 'bbdd_inventario',
  port: 5432, // Puerto por defecto de PostgreSQL
  max: 10, // Número máximo de conexiones en el pool
  idleTimeoutMillis: 30000, // Tiempo de espera antes de cerrar una conexión inactiva
  connectionTimeoutMillis: 2000, // Tiempo de espera para establecer una nueva conexión
});
