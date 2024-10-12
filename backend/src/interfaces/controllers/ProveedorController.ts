import { Request, Response } from 'express';
import { CrearProveedorUseCase } from '../../application/use-cases/proveedor/CrearProveedorUseCase';
import { Proveedor } from '../../domain/entities/Proveedor';

export class ProveedorController {
  constructor(private crearProveedorUseCase: CrearProveedorUseCase) {}

  async crearProveedor(req: Request, res: Response): Promise<void> {
    try {
      const { nombre, contacto, telefono, email, direccion } = req.body;
      const proveedor = new Proveedor(0, nombre, contacto, telefono, email, direccion);
      await this.crearProveedorUseCase.execute(proveedor);
      res.status(201).send({ mensaje: 'Proveedor creado exitosamente' });
    } catch (error: any) {
      res.status(400).send({ error: error.message });
    }
  }
}
