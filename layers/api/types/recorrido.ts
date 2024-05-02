import type { Item } from "./item";

export interface Recorrido extends Item {
  tiempo?: string;
  distancia?: decimal;
  inicio?: any;
  final?: any;
  paradas?: string;
  nombre?: string;
  nota?: string;
  status?: number;
  legacyId?: number;
}
