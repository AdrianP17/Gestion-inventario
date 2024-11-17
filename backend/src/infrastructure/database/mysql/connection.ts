import { createPool, Pool } from 'mysql2/promise';

export const db: Pool = createPool({
  host: 'localhost', // Cambia según la configuración de tu servidor MySQL
  user: 'root',
  password: 'Password123$', // Cambia según tus credenciales
  database: 'bbdd_inventario',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
