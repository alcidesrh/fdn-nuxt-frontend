import type { Item } from "./item";

export interface Menu extends Item {
  menuItems?: any;
  seccion?: string;
}
