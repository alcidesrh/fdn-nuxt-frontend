import type { Item } from "./item";

export interface Venta extends Item {
  ida?: any;
  regreso?: any;
  user?: any;
  precio?: decimal;
  factura?: any;
  createdAt?: string;
  updatedAt?: string;
  status?: number;
}
