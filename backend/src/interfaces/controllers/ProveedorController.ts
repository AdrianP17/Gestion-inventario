import { Request, Response } from 'express';
import { CrearProveedorUseCase } from '../../application/use-cases/proveedor/CrearProveedorUseCase';
import { ObtenerListaProveedorUseCase } from '../../application/use-cases/proveedor/ObtenerListaProveedoresUseCase';
import { Proveedor } from '../../domain/entities/Proveedor';

export class ProveedorController {
  constructor(private crearProveedorUseCase: CrearProveedorUseCase, private obtenerListaProveedorUseCase: ObtenerListaProveedorUseCase) {}

  async crear(req: Request, res: Response): Promise<void> {
    try {
      const { nombre, contacto, telefono, email, direccion } = req.body;
      const proveedor = new Proveedor(0, nombre, contacto, telefono, email, direccion);
      await this.crearProveedorUseCase.execute(proveedor);
      res.status(201).send({ mensaje: 'Proveedor creado exitosamente' });
    } catch (error: any) {
      res.status(400).send({ error: error.message });
    }
  }

  async obtenerLista(req: Request, res: Response): Promise<void> {
    try {
      const proveedor = await this.obtenerListaProveedorUseCase.execute();
      res.json(proveedor);
    } catch (error: any) {
      res.status(400).send({ error: error.message });
    }
  }
}
