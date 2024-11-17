import { Request, Response } from 'express';
import { CrearProveedorUseCase } from '../../application/use-cases/proveedor/CrearProveedorUseCase';
import { ObtenerTodosProveedoresUseCase } from '../../application/use-cases/proveedor/ObtenerTodosProveedoresUseCase';
import { ActualizarProveedorUseCase } from '../../application/use-cases/proveedor/ActualizarProveedorUseCase';
import { EliminarProveedorUseCase } from '../../application/use-cases/proveedor/EliminarProveedorUseCase';
import { ObtenerProveedorPorIdUseCase } from '../../application/use-cases/proveedor/ObtenerProveedorPorIdUseCase';
import { ObtenerListaProveedorUseCase } from '../../application/use-cases/proveedor/ObtenerListaProveedoresUseCase';
import { Proveedor } from '../../domain/entities/Proveedor';

export class ProveedorController {

    constructor(
        private crearProveedorUseCase: CrearProveedorUseCase,
        private obtenerTodosProveedoresUseCase: ObtenerTodosProveedoresUseCase,
        private obtenerProveedorPorIdUseCase: ObtenerProveedorPorIdUseCase,
        private actualizarProveedorUseCase: ActualizarProveedorUseCase,
        private eliminarProveedorUseCase: EliminarProveedorUseCase,
        private obtenerListaProveedorUseCase: ObtenerListaProveedorUseCase
    ) {}

    async crear(req: Request, res: Response): Promise<void> {
        const { nombre, contacto, telefono, email, direccion } = req.body;
        try {
            await this.crearProveedorUseCase.execute({
                id: 0,
                nombre,
                contacto,
                telefono,
                email,
                direccion
            });
            res.status(201).json({ message: 'Proveedor creado con éxito' });
        } catch (error: any) {
            res.status(500).json({ message: 'Error al crear el proveedor: ' + error.message });
        }
    }

    async obtenerTodosProveedores(req: Request, res: Response): Promise<void> {
        try {
            const proveedores = await this.obtenerTodosProveedoresUseCase.execute();
            res.json(proveedores);
        } catch (error: any) {
            res.status(500).json({ message: 'Error al obtener los proveedores: ' + error.message });
        }
    }

    async obtenerPorId(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const proveedor = await this.obtenerProveedorPorIdUseCase.execute(parseInt(id));
            res.json(proveedor);
        } catch (error: any) {
            res.status(500).json({ message: 'Error al obtener el proveedor por ID: ' + error.message });
        }
    }

    async actualizar(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        //Verificar que el proveedor exista
        const proveedor = await this.obtenerProveedorPorIdUseCase.execute(parseInt(id));

        if (!proveedor) {
            res.status(404).json({ message: 'Proveedor no encontrado' });
            return;
        }

        const { nombre, contacto, telefono, email, direccion } = req.body;
        try {
            await this.actualizarProveedorUseCase.execute({
                id: parseInt(id),
                nombre,
                contacto,
                telefono,
                email,
                direccion
            });
            res.status(200).json({ message: 'Proveedor actualizado con éxito' });
        } catch (error: any) {
            res.status(500).json({ message: 'Error al actualizar el proveedor: ' + error.message });
        }
    }

    async eliminar(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        //Verificar que el proveedor exista
        const proveedor = await this.obtenerProveedorPorIdUseCase.execute(parseInt(id));
        
        if (!proveedor) {
            res.status(404).json({ message: 'Proveedor no encontrado' });
            return;
        }
        
        try {
            await this.eliminarProveedorUseCase.execute(parseInt(id));
            res.status(200).json({ message: 'Proveedor eliminado con éxito' });
        } catch (error: any) {
            res.status(500).json({ message: 'Error al eliminar el proveedor: ' + error.message });
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
