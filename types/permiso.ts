import type { Item } from "./item";

export interface Permiso extends Item {
  roles?: any;
  parents?: any;
  children?: any;
  nombre?: string;
  nota?: string;
  status?: string;
  label?: string;
}
