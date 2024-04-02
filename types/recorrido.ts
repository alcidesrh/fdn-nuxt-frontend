import type { Item } from "./item";

export interface Recorrido extends Item {
  tiempo?: string;
  distancia?: decimal;
  inicio?: string;
  final?: string;
  paradas?: string;
  nombre?: string;
  nota?: string;
  status?: number;
  legacyId?: number;
}
