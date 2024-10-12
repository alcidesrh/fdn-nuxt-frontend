import { Maybe, Scalars, UserFilter_CreatedAt, UserFilter_Order } from '~/graphql/graphql';
import type { Ref } from 'vue';

type Pagination = {
    hasNextPage: Scalars['Boolean']['output'];
    itemsPerPage: Scalars['Int']['output'];
    totalCount: Scalars['Int']['output'];
    page: number;
    offset: number;
    lastPage: number;
    // isPaginate: any;
};

export type CollectionState = {
    columns: Ref<Column>;
    collection: Collection;
    params: CollectionParameters;
};

export type Column = Array<{
    name: string;
    label: string;
    sort: string;
    filter: boolean;
    schema: Record<string, string>;
}>; // name: "createdAt", label: "Fecha creación", sort: "fecha", filter: true
export type CollectionParameters = {
    page: number;
    itemsPerPage: number;
    orderField: string;
    orderType: string;
    order: [UserFilter_Order];
    createdAt: UserFilter_CreatedAt;
    nombre: string;
    username: string;
    id: number | null;
    loading: boolean;
    get: (property: string) => any;
};

export type Collection = {
    items: Maybe<Array<Maybe<{}>>>;
    pagination: Pagination;
};

const filterInputClasses: any = {
    texticon_fdn: {
        id: { inputClass: ' text-14px', outerClass: 'max-w-130px mb-0! ' },
        username: { inputClass: ' text-14px', outerClass: 'max-w-200px! mb-0! ' },
        fullName: { inputClass: 'text-14px', outerClass: 'max-w-200px mb-0! ' },
        default: { inputClass: 'text-14px', outerClass: 'max-w-200px mb-0! ' }
    },
    datepicker_fdn: {
        createdAt: { inputClass: '*:text-14px *:py-0.375rem', outerClass: ' mb-0! ' }
    }
};

export const collectionFactory = (): Collection => {
    return reactive({
        pagination: {
            page: 0,
            itemsPerPage: 15,
            hasNextPage: false,
            totalCount: 0,
            offset: 15,
            lastPage: 0
            // isPaginate: computed(() => collection.pagination.totalCount > collection.pagination.itemsPerPage)
        },
        items: []
    });
};

export const argumentFactory = (): CollectionParameters => {
    return ref({
        page: 1,
        itemsPerPage: 15,
        orderField: 'id',
        orderType: 'ASC',
        order: [{}],
        loading: false,
        get: function (field) {
            switch (field) {
                case 'fullName':
                    return 'nombre';
                default:
                    return field;
            }
        }
    });
};

export function collectionState(): CollectionState {
    return {
        columns: ref([]),
        collection: collectionFactory(),
        params: argumentFactory()
    };
}

export interface CollectionStore {
    collection: Collection;
    params: CollectionParameters;
    columns: Column;
    data: Record<string, boolean>;
}

function columnClass(c: any) {
    const temp = ['px-8px py-12px'];
    switch (c.name) {
        case 'id':
            return `${temp} min-w-100px pl-5`;
        case 'username':
            return `${temp} min-w-130px`;
        case 'fullName':
            return `${temp} min-w-250px`;
        case 'createdAt':
            return `${temp} min-w-200px`;
        default:
            if (c.action) {
                return `${temp} min-w-60px border-r border-surface-contrast-2`;
            }
            return `${temp} min-w-200px`;
            break;
    }
}

export const useCollection = () => {
    return {
        filterInputClasses,
        columnClass
    };
};
