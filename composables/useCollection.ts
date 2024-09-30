import { Maybe, Scalars } from '~/graphql/graphql';

type Variables = Ref<{ page: number; itemsPerPage: number; nombre: string; username: string } | undefined>;

type Pagination = {
    hasNextPage: Scalars['Boolean']['output'];
    itemsPerPage: Scalars['Int']['output'];
    totalCount: Scalars['Int']['output'];
    page: number;
    offset: number;
};
type Collection = {
    items?: Maybe<Array<Maybe<{}>>>;
    pagination: Pagination;
};
// type FilterCollection = Record<string, Ref<boolean>>;
type Filter = Record<string, Record<string, Ref<boolean>> | Number | string | any>;
// let variables: Variables;

const stopLoading = ref(true);
const columns: Ref<Array<Record<string, string>>> = ref([]);
const filter: Ref<Filter> = ref({
    loading: {},
    loadingReset: () => {
        for (const property in filter.value) {
            filter.value.loading[property] = false;
        }
    }
});

const collection: Collection = reactive({
    pagination: {
        page: 0,
        itemsPerPage: 15,
        hasNextPage: false,
        totalCount: 0,
        offset: 15
    },
    items: []
});
let params = ref({
    page: 1,
    itemsPerPage: collection.pagination.itemsPerPage,
    orderField: 'id',
    orderType: 'ASC',
    order: computed(() => {
        if (!params.value.orderField) return [{}];
        const order = {} as any;
        order[params.value.orderField] = params.value.orderType;
        return order;
    }),
    createdAt: {},
    nombre: '',
    username: '',
    id: null,
    get: () => {
        return { page: params.value.page, itemsPerPage: params.value.itemsPerPage, nombre: params.value.nombre, username: params.value.username };
    }
});
const getProperty = (i: string) => {
    // const temp = []
    if (i == 'fullName') {
        return 'nombre';
    } else if (i == '_id') {
        return 'id';
    }
    return i;
};
function highlight() {
    if (!CSS.highlights) {
        return;
    }

    CSS.highlights.clear();

    let properties: any = [],
        property: any = null;

    columns.value
        .filter((i) => i.search)
        .forEach((i) => {
            property = getProperty(i.field);
            const highlights = document.querySelectorAll(`.highlight.${property}`);
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
        });

    Object.keys(properties).forEach((i) => {
        let str = params.value[i]?.toString().trim().toLowerCase();
        if (!str) {
            return;
        }
        // str = str.;
        // if (Number.isInteger(value)) {
        //     str = params.value[i];
        // } else if (typeof value == 'string') {
        //     str = params.value[i]?.trim().toLowerCase();
        // }

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
        CSS.highlights.set(`highlight-${i}`, searchResultsHighlight);
    });
}
watch(
    () => collection.items,
    () => {
        nextTick(highlight);
    }
);
watch(
    () => filter.value as any,
    (v: Record<string, string>) => {
        params.value.page = 1;
        params.value = { ...params.value, ...v };
        if (params.value?.id) {
            params.value.id = Number(params.value.id) as any;
        }
    }
);
export const useCollection = () => {
    return {
        collection,
        params,
        columns,
        filter,
        getProperty,
        stopLoading
    };
};
