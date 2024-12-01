import { OrdenSalidaInventario } from "../entities/OrdenSalidaInventario";
export interface IOrdenSalidaInventarioRepository {
    obtenerTodas(): Promise<OrdenSalidaInventario[]>;
    obtenerPorId(ID: number): Promise<OrdenSalidaInventario | null>;
    crear(data: {Fecha_Registro: Date; Motivo: string; Area: string; Estado: string; Total_Salida: number; Observaciones: Text }): Promise<void>;
    actualizar(data: {ID: number; Fecha_Registro: Date; Motivo: string; Area: string; Estado: string; Total_Salida: number; Observaciones: Text }): Promise<void>;
    eliminar(ID: number): Promise<void>;
  }
  