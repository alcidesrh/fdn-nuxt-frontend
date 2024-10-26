import type { Item } from "./item";

export interface Permiso extends Item {
  padre?: any;
  hijos?: any;
  usuarios?: any;
  nombre?: string;
  nota?: string;
  status?: string;
}
