import type { Item } from "./item";

export interface Parada extends Item {
  enclave?: any;
  recorridos?: any;
  nombre?: string;
  nota?: string;
  status?: string;
  label?: string;
}
