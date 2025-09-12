import type { Item } from './item'

export interface Role extends Item {
  nombre?: string
  parents?: any
  children?: any
  permisos?: any
  label?: string
}
