import type { Item } from "./item";

export interface Empresa extends Item {
  nombreComercial?: string;
  denominacionSocial?: string;
  alias?: string;
  createdAt?: string;
  updatedAt?: string;
  status?: number;
  legacyId?: number;
  nombre?: string;
  email?: string;
  nit?: string;
  telefono?: string;
  direccion?: string;
  localidad?: any;
}
