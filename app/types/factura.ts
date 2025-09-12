import type { Item } from './item'

export interface Factura extends Item {
  dte?: string
  uuid?: string
  fecha?: string
  serie?: string
  venta?: any
  createdAt?: string
  updatedAt?: string
  status?: string
  label?: string
}
