import express, { Request, Response } from 'express';
import productoRouter from './interfaces/routes/productoRoutes';
import ordenCompraRouter from './interfaces/routes/ordenCompraRoutes';
import proveedorRouter from './interfaces/routes/proveedorRoutes';
import recepcionRoutes from './interfaces/routes/recepcionCompraRoutes';
import bodyParser from 'body-parser';
import categoriaRouter from './interfaces/routes/categoriaRoutes';
import salidaInventarioRouter from './interfaces/routes/salidaInventarioRoutes';
import kardexRouter from './interfaces/routes/kardexRoutes';
import { db } from './infrastructure/database/postgresql/connection';
const app = express();
const port = 3001;
// Middleware para parsear JSON
app.use(bodyParser.json());

// Registrar las rutas
app.use('/api/productos', productoRouter);
app.use('/api/ordenes', ordenCompraRouter);
app.use('/api/proveedores', proveedorRouter);
app.use('/api/recepciones', recepcionRoutes);
app.use('/api/categorias', categoriaRouter);
app.use('/api/kardex', kardexRouter);
app.use('/api/salidas', salidaInventarioRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

app.get('/test-connection', async (req, res) => { try { const result = await db.query('SELECT NOW()'); res.json({ message: 'Conexión exitosa', time: result.rows[0].now }); } catch (err) { console.error(err); res.status(500).send('Error al conectar a la base de datos'); } });

// Manejo de errores para rutas no encontradas
app.use((req, res) => {
  res.status(404).send({ message: 'Ruta no encontrada' });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
