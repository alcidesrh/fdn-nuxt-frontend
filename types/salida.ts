import type { Item } from "./item";

export interface Salida extends Item {
  fecha?: string;
  bus?: any;
  recorrido?: any;
  empresa?: any;
  salidaLogs?: any;
  boletos?: any;
  createdAt?: string;
  updatedAt?: string;
  status?: string;
}
