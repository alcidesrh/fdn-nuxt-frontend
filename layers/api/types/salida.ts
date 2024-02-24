import type { Item } from "./item";

export interface Salida extends Item {
  ruta?: any;
  fecha?: string;
  bus?: any;
}
