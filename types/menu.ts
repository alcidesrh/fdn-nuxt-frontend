import type { Item } from "./item";

export interface Menu extends Item {
  link?: string;
  tipo?: string;
  parent?: any;
  posicion?: number;
  children?: any;
  nombre?: string;
  nota?: string;
  status?: string;
}
