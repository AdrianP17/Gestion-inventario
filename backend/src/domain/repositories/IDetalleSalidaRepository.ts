import { DetalleSalida } from "../entities/DetalleSalida";
export interface IDetalleSalidaRepository {
    obtenerPorSalida(Salida_InventarioID: number): Promise<DetalleSalida | null>;
    crear(data: {Salida_InventarioID: number; ProductoID: number; Cantidad: number; Precio_Unitario: number; Subtotal: number; Estado: string }): Promise<void>;
    actualizar (data: {Salida_InventarioID: number; ProductoID: number; Cantidad: number; Precio_Unitario: number; Subtotal: number; Estado: string }): Promise<void>;
    eliminarPorSalida(Salida_InventarioID: number): Promise<void>;
  }
  