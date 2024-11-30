import { Router } from "express";
import { RecepcionCompra } from "../../domain/entities/RecepcionCompra";
import { ObtenerTodosRecepcionCompraUseCase } from "../../application/use-cases/recepcion-compra/ObtenerTodosRecepcionCompra";
import { RecepcionCompraController } from "../controllers/RecepcionCompraController";
import { MySQLRecepcionCompraRepository } from "../../infrastructure/database/mysql/MySQLRecepcionCompraRepository";
const recepcionRoutes = Router();

const recepcionCompraRepository = new MySQLRecepcionCompraRepository();
const obtenerTodosRecepcionCompraUseCase = new ObtenerTodosRecepcionCompraUseCase(recepcionCompraRepository);

const recepcionCompraController = new RecepcionCompraController(obtenerTodosRecepcionCompraUseCase);

recepcionRoutes.get("/", async (req, res) => {
    await recepcionCompraController.obtenerRecepciones(req, res);
});

export default recepcionRoutes;