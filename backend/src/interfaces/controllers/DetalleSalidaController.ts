import { Request, Response } from "express";
import { CrearDetalleSalidaUseCase } from "../../application/use-cases/detalle-salida/CrearDetalleSalidaUseCase";

export class DetalleSalidaController {
    constructor(private crearDetalleSalidaUseCase: CrearDetalleSalidaUseCase) {}
    async crear(req: Request, res: Response) {
        

    }

}