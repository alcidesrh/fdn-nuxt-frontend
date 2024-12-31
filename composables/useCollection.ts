import { Maybe, Scalars, UserFilter_Order } from '~/graphql/graphql';
import type { Ref } from 'vue';
import { useChangeCase } from '@vueuse/integrations/useChangeCase.mjs';
import { VariablesParameter } from '@vue/apollo-composable/dist/useQuery.js';
import { OperationVariables } from '@apollo/client/core';

type Pagination = {
    hasNextPage?: Scalars['Boolean']['output'];
    itemsPerPage?: number;
    totalCount?: Scalars['Int']['output'];
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
    columns: [Column] | any;
    items: Maybe<Array<Maybe<{}>>>;
    pagination: Pagination;
    vars: VariablesParameter<OperationVariables>;
    args: Record<string, string | Record<string, string>>;
    orderField: string;
    orderType: string;
    loading: boolean;
    query: string;
    queryFields: any;
    resource: string;
    columnClass: (property: Record<string, string>) => string;
    filterInputClass: (property: Record<string, any>) => any;
    setColumns: (columns: Array<Record<string, any>>) => void;
};

export const useCollection: (resource: string) => Record<any, Ref<Collection>> = (resource: string) => {
    const collection: Ref<Collection> = ref({
        resource: resource,
        menu: 'editar',
        columns: [],
        pagination: {},
        items: [],
        orderField: 'id',
        orderType: 'ASC',
        loading: false,
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
        query: resource + 's',
        queryFields: computed(() => [{ collection: ['_id', ...collection.value.columns.map((i) => i.name)] }, { paginationInfo: ['itemsPerPage', 'lastPage', 'totalCount', 'hasNextPage'] }]),
        columnClass: () => '',
        filterInputClass: () => '',
        setColumns: (columns) => {
            collection.value.columns = columns.map((i) => {
                let temp: any = useCloned(i).cloned.value;
                let temp2: any = {};
                if (temp.schema) {
                    temp2 = collection.value.filterInputClass(i);
                    temp.schema = { ...temp.schema, ...temp2, ...{ eventbus: `filterinput_${resource}` } };
                    if (temp.schema.name == 'id') {
                        collection.value.args.id = { type: `Int` };
                    } else if ('createdAt' == temp.schema.name) {
                        collection.value.args.createdAt = { type: `[UserFilter_createdAt]` };
                    } else {
                        collection.value.args[temp.schema.name] = { type: 'String' };
                    }
                    collection.value.vars[temp.schema.name] = undefined;
                }

                return temp;
            });
        }
    });

    watch(
        () => collection.value.items,
        () => {
            nextTick(() => highlighted(collection));
        }
    );

    return {
        collection
    };
};
