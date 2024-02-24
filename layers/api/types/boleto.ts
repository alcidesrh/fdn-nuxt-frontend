import type { Item } from "./item";

export interface Boleto extends Item {
  usuario?: any;
  cliente?: any;
  salida?: any;
  asientos?: any;
  precio?: decimal;
}
