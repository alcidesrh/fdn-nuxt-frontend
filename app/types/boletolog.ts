import type { Item } from './item'

export interface BoletoLog extends Item {
  boleto?: any
  tipo?: number
  createdAt?: string
  updatedAt?: string
  descripcion?: string
  user?: any
  label?: string
}
