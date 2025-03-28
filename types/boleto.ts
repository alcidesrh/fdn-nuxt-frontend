import type { Item } from "./item";

export interface Boleto extends Item {
  cliente?: any;
  precio?: decimal;
  boletoLogs?: any;
  asiento?: any;
  salida?: any;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  label?: string;
}
