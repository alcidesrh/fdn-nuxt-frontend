import type { Item } from "./item";

export interface Menu extends Item {
  link?: string;
  posicion?: number;
  tipo?: string;
  nombre?: string;
  nota?: string;
  icon?: string;
  roles?: any;
  permisos?: any;
  parent?: any;
  children?: any;
  allowUsers?: any;
  denyUsers?: any;
  status?: string;
  label?: string;
}
