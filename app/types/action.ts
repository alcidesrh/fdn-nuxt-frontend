import type { Item } from "./item";

export interface Action extends Item {
  ruta?: string;
  icon?: string;
}
