import type { Item } from "./item";

export interface MenuItem extends Item {
  link?: string;
  nombre?: string;
  nota?: string;
  status?: number;
  parent?: any;
  posicion?: number;
  children?: any;
  slug?: string;
}
