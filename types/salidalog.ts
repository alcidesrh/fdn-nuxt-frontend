import type { Item } from "./item";

export interface SalidaLog extends Item {
  tipo?: string;
  salida?: any;
  createdAt?: string;
  updatedAt?: string;
  descripcion?: string;
  user?: any;
}
