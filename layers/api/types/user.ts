import type { Item } from "./item";

export interface User extends Item {
  username?: string;
  roles?: string;
  password?: string;
  nombre?: string;
  apellido?: string;
  email?: string;
  apiTokens?: string;
  createdAt?: string;
  updatedAt?: string;
  userIdentifier?: string;
  validTokenStrings?: string;
}
