import express, { Request, Response } from 'express';
import productoRouter from './interfaces/routes/productoRoutes';

import bodyParser from 'body-parser';
<<<<<<< Updated upstream
=======
import categoriaRouter from './interfaces/routes/categoriaRoutes';
import ordenSalidaInventarioRouter from './interfaces/routes/ordenSalidaInventarioRoutes';
import detalleSalidaRouter from './interfaces/routes/detalleSalidaRoutes';
import kardexRouter from './interfaces/routes/kardexRoutes';
>>>>>>> Stashed changes
const app = express();
const port = 3000;
// Middleware para parsear JSON
app.use(bodyParser.json());

// Registrar las rutas
app.use('/api/productos', productoRouter);
<<<<<<< Updated upstream
=======
app.use('/api/ordenes', ordenCompraRouter);
app.use('/api/proveedores', proveedorRouter);
app.use('/api/recepciones', recepcionRoutes);
app.use('/api/categorias', categoriaRouter);
app.use('/api/kardex', kardexRouter);
app.use('/api/salidas', ordenSalidaInventarioRouter);
app.use('/api/detallessalidas', detalleSalidaRouter);
>>>>>>> Stashed changes

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

// Manejo de errores para rutas no encontradas
app.use((req, res) => {
  res.status(404).send({ message: 'Ruta no encontrada' });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
