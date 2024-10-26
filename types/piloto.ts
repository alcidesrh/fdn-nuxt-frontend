import type { Item } from "./item";

export interface Piloto extends Item {
  licencia?: string;
  licenciaVencimiento?: string;
  dpi?: string;
  sexo?: string;
  fechaNacimiento?: string;
  seguroSocial?: string;
  nacionalidad?: string;
  createdAt?: string;
  updatedAt?: string;
  status?: string;
  legacyId?: number;
  apellido?: string;
  nombre?: string;
  email?: string;
  nit?: string;
  telefono?: string;
  direccion?: string;
  localidad?: any;
}
