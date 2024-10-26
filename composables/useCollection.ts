import { Maybe, Scalars, UserFilter_CreatedAt, UserFilter_Order } from '~/graphql/graphql';
import type { Ref } from 'vue';

type Pagination = {
    hasNextPage?: Scalars['Boolean']['output'];
    itemsPerPage?: number;
    totalCount?: Scalars['Int']['output'];
    page?: number;
};

export type Column = Array<{
    name: string;
    label: string;
    sort: string;
    filter: boolean;
    schema: Record<string, string>;
}>;

export type CollectionVars = {
    order?: [UserFilter_Order];
    createdAt?: UserFilter_CreatedAt;
    nombre?: string;
    username?: string;
    id?: number | null;
    itemsPerPage: Scalars['Int']['output'];
    page: number;
};

export type Collection = {
    menu: string;
    resource: string;
    label: string;
    columns: [Column] | any;
    items: Maybe<Array<Maybe<{}>>>;
    pagination: Pagination;
    vars: CollectionVars;
    orderField: string;
    orderType: string;
    loading: boolean;
    get: (property: string) => string;
};

export const collectionFactory = (): Ref<Collection> => {
    return ref({
        menu: 'editar',
        resource: '',
        label: '',
        columns: [],
        pagination: {},
        items: [],
        orderField: 'id',
        orderType: 'ASC',
        loading: false,
        vars: {
            page: 1,
            itemsPerPage: 15
        },
        get: function (field: string): string {
            switch (field) {
                case 'fullName':
                    return 'nombre';
                default:
                    return field;
            }
        }
    });
};
export interface CollectionStore {
    collection: Collection;
}

export function collectionState(): Ref<Collection> {
    return collectionFactory();
}

export function collectionStore() {
    const collection = collectionFactory();
    const sort = function (d: string) {
        const col = collection.value.columns.find((i) => i.name == d);
        if (typeof col != 'undefined') {
            d = col.name;
        }
        if (collection.value.orderField == d) {
            if (collection.value.orderType == 'ASC') {
                collection.value.orderType = 'DESC';
            } else if (collection.value.orderType == 'DESC') {
                collection.value.orderField = '';
                collection.value.orderType = '';
            }
        } else if (d) {
            collection.value.vars.page = 1;
            collection.value.orderField = d;
            collection.value.orderType = 'ASC';
        } else {
            collection.value.orderField = '';
            collection.value.orderType = '';
        }

        if (!collection.value.orderField) {
            collection.value.vars.order = [{}];
        } else {
            // const
            const order = {} as any;
            order[collection.value.get(collection.value.orderField)] = collection.value.orderType;
            collection.value.vars.order = [order];
        }
    };

    const highlighted = function (): void {
        if (!CSS.highlights) {
            return;
        }

        CSS.highlights.clear();

        let properties: any = [],
            property: any = null;

        collection.value.columns.forEach((i: any, index) => {
            if (!i.schema) {
                properties.push([]);
            } else {
                property = i.schema.name;
                const highlights = document.querySelectorAll(`.highlight-${index}`);
                if (!highlights.length) {
                    return;
                }

                if (typeof properties[property] == 'undefined') {
                    properties[property] = [];
                }
                highlights.forEach((i) => {
                    // console.log(`.highlight.${property}`);

                    const iter = document.createNodeIterator(i, NodeFilter.SHOW_TEXT);
                    let temp = iter.nextNode();
                    if (temp) {
                        properties[property].push(temp);
                        while ((temp = iter.nextNode())) {
                            properties[property].push(temp);
                        }
                    }
                });
            }
        });
        Object.keys(properties).forEach((i, index) => {
            if (properties[i].length) {
                let str = collection.value.vars[i]?.toString().trim().toLowerCase();
                if (!str) {
                    return;
                }

                const ranges = properties[i]
                    .map((el) => {
                        return { el, text: el.textContent.toLowerCase() };
                    })
                    .map(({ text, el }) => {
                        const indices = [];
                        let startPos = 0;
                        while (startPos < text.length) {
                            const index = text.indexOf(str, startPos);
                            if (index === -1) break;
                            indices.push(index);
                            startPos = index + str.length;
                        }

                        // Create a range object for each instance of
                        // str we found in the text node.
                        return indices.map((index) => {
                            const range = new Range();
                            range.setStart(el, index);
                            range.setEnd(el, index + str.length);
                            // console.log(index, index + str.length);

                            return range;
                        });
                    });
                const searchResultsHighlight = new Highlight(...ranges.flat());
                CSS.highlights.set(`highlight-${index}`, searchResultsHighlight);
            }
        });
    };

    return {
        collection,
        sort,
        highlighted
    };
}

const filterInputClasses: any = {
    texticon_fdn: {
        id: { inputClass: ' text-14px', outerClass: 'min-w-100px max-w-130px mb-0! ' },
        username: { inputClass: ' text-14px', outerClass: 'max-w-200px! mb-0! ' },
        fullName: { inputClass: 'text-14px', outerClass: 'max-w-200px mb-0! ' }
    },
    datepicker_fdn: {
        createdAt: { inputClass: '*:text-14px *:py-0.375rem', outerClass: ' mb-0! ' }
    }
};

function columnClass(c: any) {
    const temp = ''; // ['px-8px py-12px'];
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
