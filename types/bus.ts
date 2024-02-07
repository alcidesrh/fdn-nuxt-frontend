import type { Item } from "./item";

export interface Bus extends Item {
  asientosClaseA?: number;
  asientosClaseB?: number;
  codigo?: string;
}
