import type { Item } from './item'

export interface Bus extends Item {
  codigo?: string
  asientos?: any
  precioVariacionAsientoA?: decimal
  precioVariacionAsientoB?: decimal
  empresa?: any
  piloto?: any
  marca?: string
  placa?: string
  createdAt?: string
  updatedAt?: string
  status?: string
  legacyId?: number
  label?: string
}
