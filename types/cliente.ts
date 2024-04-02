import type { Item } from "./item";

export interface Cliente extends Item {
  dpi?: string;
  createdAt?: string;
  updatedAt?: string;
  status?: number;
  legacyId?: number;
  apellido?: string;
  nombre?: string;
  email?: string;
  nit?: string;
  telefono?: string;
  direccion?: string;
  localidad?: any;
}
