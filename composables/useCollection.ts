import { Maybe, Scalars, UserFilter_Order } from '~/graphql/graphql';
import type { Ref } from 'vue';
import { useChangeCase } from '@vueuse/integrations/useChangeCase.mjs';

type Pagination = {
    hasNextPage?: Scalars['Boolean']['output'];
    itemsPerPage?: number;
    totalCount: Scalars['Int']['output'];
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
    itemsPerPage: Scalars['Int']['output'];
    page: number;
};

export type Collection = {
    menu: string;
    columns: [Column] | [];
    items: Maybe<Array<Maybe<{}>>>;
    pagination: Pagination;
    vars: any;
    args: Record<string, string | Record<string, string>>;
    orderField: string;
    orderType: string;
    loading: boolean;
    query: string;
    resource: string;
    hasFilter: boolean;
    setColumns: (columns: Record<'collection' | 'filter', Array<Record<string, any>> | boolean>) => void;
    reload: () => void;
    sort: (p: string) => void;
    iniCollection: () => void;
    getCollection: () => void;
};

export const useCollection: (resource: string) => Record<any, Ref<Collection>> = (resource: string) => {
    const camelCase = useChangeCase(resource, 'camelCase').value;

    const collection: Ref<Collection> = ref({
        resource: resource,
        menu: 'editar',
        columns: [],
        pagination: {} as any,
        items: [],
        orderField: 'id',
        orderType: 'ASC',
        loading: false,
        hasFilter: false,
        args: {
            page: { type: 'Int' },
            itemsPerPage: { type: 'Int' },
            order: { type: `[${useChangeCase(resource, 'pascalCase').value}Filter_order]` }
        },
        vars: {
            page: 1,
            itemsPerPage: 15,
            order: [{ id: 'ASC' }]
        },
        query: camelCase + 's',
        setColumns: (data) => {
            collection.value.hasFilter = data.filter as boolean;
            collection.value.columns = (data.collection as any).map((i) => {
                let temp: any = useCloned(i).cloned.value;
                if (temp.schema) {
                    temp.schema = { ...temp.schema, ...{ eventbus: `filterinput_${resource}` } };
                    if (typeof temp.schema.bind != 'undefined') {
                        temp.schema = { ...temp.schema, ...temp.schema.bind, ...{ eventbus: `filterinput_${resource}` } };
                        delete temp.schema.bind;
                    }
                    if (temp.schema.name == 'id') {
                        collection.value.args.id = { type: `Int` };
                    } else if ('createdAt' == temp.schema.name) {
                        collection.value.args.createdAt = { type: `[UserFilter_createdAt]` };
                    } else {
                        collection.value.args[temp.schema.name] = { type: 'String' };
                    }
                    collection.value.vars[temp.schema.name] = null;
                }
                return temp;
            });
        },
        reload: function () {
            this.getCollection({ fetchPolicy: 'network-only' });
        },
        sort: function (d: string) {
            const col = this.columns.find((i) => i.name == d);
            if (typeof col != 'undefined') {
                d = col.name;
            }
            if (this.orderField == d) {
                if (this.orderType == 'ASC') {
                    this.orderType = 'DESC';
                } else if (this.orderType == 'DESC') {
                    this.orderField = '';
                    this.orderType = '';
                }
            } else if (d) {
                this.vars.page = 1;
                this.orderField = d;
                this.orderType = 'ASC';
            } else {
                this.orderField = '';
                this.orderType = '';
            }

            if (!this.orderField) {
                this.vars.order = [{}];
            } else {
                // const
                const order = {} as any;
                order[this.orderField] = this.orderType;
                this.vars.order = [order];
            }
        },
        iniCollection: function () {
            if (this.columns.length) {
                this.getCollection();
                return;
            }

            const { onResult, loading } = apollo.query('columnsMetadataResource', { resource: this.resource });

            onResult(({ data, networkStatus }) => {
                if (typeof data == 'undefined' && networkStatus == 1) {
                    return;
                }

                this.setColumns(data.columnsMetadataResource.data);
                this.getCollection();
            });
            watch(
                () => loading.value,
                (v) => {
                    collection.value.loading = v;
                }
            );
        },
        getCollection: function (fetchPolicy = {}) {
            const { loading, onResult } = apollo.collection(this, fetchPolicy);

            onResult(({ data, networkStatus }) => {
                if (typeof data == 'undefined' && networkStatus == 1) {
                    return;
                }
                const { y: scrollY } = useWindowScroll();
                scrollY.value = 0;
                const { collection: collectionResult, paginationInfo } = data[collection.value.query];
                this.pagination = paginationInfo;
                this.items = collectionResult;
                this.loading = false;
            });

            watch(
                () => loading.value,
                (v) => {
                    collection.value.loading = v;
                }
            );
        }
    });
    // watch(
    //     () => collection.value.vars,
    //     (v, o) => {
    //         cl(v, o);
    //         collection.value.reload();
    //     }
    // );

    watch(
        () => collection.value.items,
        () => {
            nextTick(() => highlighted(collection));
        }
    );

    msgbus(`filterinput_${resource}`).on((v: any) => {
        collection.value.loading = v;
    });

    return {
        collection
    };
};
