import type { Item } from "./item";

export interface Taxon extends Item {
  parent?: any;
  posicion?: number;
  children?: any;
  nombre?: string;
  nota?: string;
  status?: string;
  label?: string;
}
