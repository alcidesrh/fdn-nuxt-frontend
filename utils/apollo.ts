import { InputMaybe, Scalars } from './../graphql/graphql';
import { useQuery, useLazyQuery as l, useQueryLoading } from '@vue/apollo-composable';
import { jsonToGraphQLQuery, VariableType } from './json-to-graphql-query/src';
import gql from 'graphql-tag';

const { y } = useWindowScroll();

export function getCollection(query, collection) {
    const { result, loading, onError, networkStatus } = useQuery(query, () => collection.value.vars);
    onError(merror);
    watch(
        () => result.value,
        (v) => {
            if (typeof v == 'undefined') {
                return;
            }
            y.value = 0;
            const { collection: p, paginationInfo } = v[query.definitions[0].name.value];
            collection.value.pagination = paginationInfo;
            collection.value.items = p;
            collection.value.loading = false;
        }
    );

    watch(
        () => loading.value,
        (v) => {
            collection.value.loading = v;
        }
    );

    return { result, loading };
}

export function gqlQueryColumns(query, data) {
    const { collection, resource } = data;
    const { filterInputClasses } = useCollection();
    const { result, loading, onError } = useQuery(query, { className: resource });
    onError(merror);
    watch(
        () => result.value,
        (v) => {
            if (typeof v == 'undefined') {
                return;
            }
            const queryName = query.definitions[0].selectionSet.selections[0].name.value;
            const target = query.definitions[0].selectionSet.selections[0].selectionSet.selections[0].name.value;
            const { collection: p } = v[queryName][target];
            collection.value.columns = p.map((i: any) => {
                let temp: any = useCloned(i).cloned.value;
                let temp2: any = {};
                if (temp.schema && filterInputClasses[temp.schema.$formkit]) {
                    temp2 = filterInputClasses[temp.schema.$formkit];
                    if (temp2[temp.name]) {
                        temp.schema = { ...temp.schema, ...temp2[temp.name], ...{ eventbus: `filterinput_${resource}` } };
                    }
                }
                return temp;
            });
        }
    );

    watch(
        () => loading.value,
        (v) => {
            collection.value.loading = v;
        }
    );

    return { result, loading };
}

export function gqlQueryResource(query, ID, store) {
    const { item: item, resource: resource } = store;
    const { result, loading, onError } = useQuery(query, { id: ID });
    onError(merror);
    watch(
        () => result.value,
        (v) => {
            item.value = useCloned(v[resource]).cloned.value;
        }
    );

    // watch(
    //     () => loading.value,
    //     (v) => {
    //         collection.value.loading = v;
    //     }
    // );

    return { result, loading };
}

export function getCustomCollection(resource: string, fields = Array<string>, params: Record<string, Ref | Record<string, string> | null> = { args: null }) {
    const { reference, args } = params;
    const root = {
        query: {}
    };

    const fielsdParsed: any = {};
    fields.map((i) => (fielsdParsed[i] = true));

    root.query[resource] = {
        __args: args,
        collection: fielsdParsed
    };
    const query: any = gql`
        ${jsonToGraphQLQuery(root)}
    `;
    if (!reference) {
        return useQuery(query);
    }
    const { result, loading, onError } = useQuery(query);
    onError(merror);
    watch(
        () => result.value,
        (v) => {
            if (typeof v == 'undefined') {
                return;
            }
            y.value = 0;

            const { collection: p, paginationInfo } = v[resource];
            reference.value.pagination = paginationInfo;
            reference.value.items = p;
            reference.value.loading = false;
        }
    );

    watch(
        () => loading.value,
        (v) => {
            reference.value.loading = v;
        }
    );

    return { result, loading };
}

export function getResource(resource: string, fields: Array<string> = [], params: any = { args: null }) {
    const { reference, args } = params;
    let root = {
        query: {}
    };

    const fielsdParsed: any = {};
    fields.forEach((i) => (fielsdParsed[i] = true));
    root.query = {
        __name: resource,
        __variables: {
            username: 'String'
        }
    };
    root.query[resource] = {
        __args: {
            username: new VariableType('username')
        },
        ...fielsdParsed
        // }
    };

    const query: any = gql`
        ${jsonToGraphQLQuery(root)}
    `;

    if (!reference) {
        return useQuery(query);
    }
    const { result, loading, onError, onResult } = useQuery(query, () => args);
    onError(merror);
    onResult((v: { data }) => {
        const { data } = v;
        if (typeof v == 'undefined' || typeof data == 'undefined') {
            return;
        }
        y.value = 0;
        reference.value = useCloned(data[resource]).cloned.value;
    });
    // watch(
    //     () => result.value,
    //     (v) => {
    //         if (typeof v == 'undefined') {
    //             return;
    //         }
    //         y.value = 0;
    //         reference.value = v[resource];
    //     }
    // );

    // watch(
    //     () => loading.value,
    //     (v) => {
    //         reference.value.loading = v;
    //     }
    // );
    return { result, loading };
}
