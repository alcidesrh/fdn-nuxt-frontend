import type { Item } from "./item";

export interface Enclave extends Item {
  email?: string;
  telefono?: string;
  direccion?: string;
  localidad?: any;
  nombre?: string;
  nota?: string;
  status?: string;
  label?: string;
}
