import type { Item } from "./item";

export interface Estacion extends Item {
  nombre?: string;
  localidad?: any;
  direccion?: string;
}
