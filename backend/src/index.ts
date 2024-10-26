import express, { Request, Response } from 'express';
import productoRouter from './interfaces/routes/productoRoutes';
import ordenCompraRouter from './interfaces/routes/ordenCompraRoutes';

import bodyParser from 'body-parser';
const app = express();
const port = 3000;
// Middleware para parsear JSON
app.use(bodyParser.json());

// Registrar las rutas
app.use('/api/productos', productoRouter);
app.use('/api/ordenes', ordenCompraRouter);

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
