import type { Item } from "./item";

export interface Ruta extends Item {
  estacionOrigen?: any;
  estacionDestino?: any;
  nombre?: string;
}
