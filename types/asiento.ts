import type { Item } from "./item";

export interface Asiento extends Item {
  numero?: number;
  bus?: any;
  clase?: string;
  label?: string;
}
