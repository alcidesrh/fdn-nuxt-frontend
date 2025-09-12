import type { Item } from './item'

export interface Agencia extends Item {
  users?: any
  alias?: string
  email?: string
  telefono?: string
  direccion?: string
  localidad?: any
  nombre?: string
  nota?: string
  status?: string
  legacyId?: number
  label?: string
}
