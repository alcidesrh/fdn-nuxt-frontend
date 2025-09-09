import type { Maybe, Scalars, UserFilter_Order } from "~/graphql/graphql";

export type Pagination = {
  hasNextPage?: Scalars["Boolean"]["output"];
  itemsPerPage?: number;
  totalCount: Scalars["Int"]["output"];
  page?: number;
};

export type Column = {
  name: string;
  label: string;
  sort: string;
  filter: boolean;
  schema: Record<string, string>;
  style: string;
};

export type CollectionVars = {
  order?: [UserFilter_Order];
  itemsPerPage: Scalars["Int"]["output"];
  page: number;
};

export type Collection = {
  menu: string;
  columns: [Column] | [];
  items: Maybe<Array<Maybe<{}>>>;
  pagination: Pagination;
  vars: any;
  orderField: string;
  orderType: string;
  loading: boolean;
  resource: string;
  hasFilter: boolean;
  query: string;
};
