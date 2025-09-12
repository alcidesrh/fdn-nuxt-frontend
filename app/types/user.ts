import type { Item } from './item'

export interface User extends Item {
  username?: string
  password?: string
  apiTokens?: string
  roles?: any
  permisos?: any
  createdAt?: string
  updatedAt?: string
  status?: string
  legacyId?: number
  apellido?: string
  nombre?: string
  email?: string
  nit?: string
  telefono?: string
  direccion?: string
  localidad?: any
  userIdentifier?: string
  fullName?: string
  label?: string
  validTokenStrings?: string
}
