import type { Item } from "./item";

export interface Cliente extends Item {
  nit?: string;
  dpi?: string;
  apellido?: string;
  direccion?: string;
  telefono?: string;
  correo?: string;
}
