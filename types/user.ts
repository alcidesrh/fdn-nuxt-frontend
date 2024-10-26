import type { Item } from './item'

export interface User extends Item {
  idNumber?: string
  username?: string
  roles?: string
  password?: string
  apiTokens?: string
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
  validTokenStrings?: string
}
