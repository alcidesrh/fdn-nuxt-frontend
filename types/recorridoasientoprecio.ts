import type { Item } from "./item";

export interface RecorridoAsientoPrecio extends Item {
  recorrido?: any;
  precioAsientoA?: decimal;
  precioAsientoB?: decimal;
}
