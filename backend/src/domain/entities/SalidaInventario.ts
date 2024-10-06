export class SalidaInventario {
    constructor(
      public id: number,
      public fechaSalida: Date,
      public area: string,
      public estado: string,
      public totalSalida: number
    ) {}
  }
  