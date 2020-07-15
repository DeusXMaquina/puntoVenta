// export interface TableRow {
//     id: string;
//     queue: string;
//     region: string;
//     language: string;
//     entryPointId: string;
//     locale: string;
//     sessionArticleId: string;
//     proactiveArticleId: string;
//     chatButtonInfo: string;
// }

export interface TableRow {
  id: number,
  nombre: string,
  precioVenta?: number,
  telefono?: string,
  correoElectronico?:string
}

export interface TableRowClients {
  id: number,
  nombre: string,
  telefono: string,
  correoElectronico: string
}

export interface TableRowInventory {
  id: number,
  nombre: string,
  cantidad: number
}