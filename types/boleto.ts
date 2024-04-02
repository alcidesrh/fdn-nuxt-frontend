import type { Item } from "./item";

export interface Boleto extends Item {
  cliente?: any;
  precio?: decimal;
  boletoLogs?: any;
  asiento?: any;
  salida?: any;
  estado?: number;
  status?: number;
  createdAt?: string;
  updatedAt?: string;
}
