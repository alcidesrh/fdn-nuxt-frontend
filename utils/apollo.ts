import { users, columnsCollection } from '~~/graphql/queries';
import { useQuery, useMutation } from '@vue/apollo-composable';
import { jsonToGraphQLQuery, VariableType } from './json-to-graphql-query/src';
import gql from 'graphql-tag';

const { y } = useWindowScroll();

export function getCollection(query, collection) {
    const { result, loading, onError, refetch } = useQuery(query, () => collection.value.vars);
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

    return { result, loading, refetch };
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

export function getResource(resource: string, fields: Array<string> = [], params: any = { args: null }) {
    const { reference, args } = params;
    log(args);
    let root = {
        query: {}
    };

    const fielsdParsed: any = {};
    fields.forEach((i) => (fielsdParsed[i] = true));
    root.query = {
        __name: resource,
        __variables: args.variables.types
    };
    root.query[resource] = {
        __args: args.signature,
        ...fielsdParsed
    };

    const query: any = gql`
        ${jsonToGraphQLQuery(root)}
    `;

    if (!reference) {
        return useQuery(query);
    }
    const { result, loading, onError, onResult } = useQuery(query, args.variables.value);
    onError(merror);
    onResult((v: { data }) => {
        const { data } = v;
        if (typeof v == 'undefined' || typeof data == 'undefined') {
            return;
        }
        y.value = 0;
        reference.value = useCloned(data[resource]).cloned.value;
    });
    return { result, loading };
}

export function updateResource(name, args) {
    const root = {
        mutation: {
            __name: name,
            __variables: args.types
        }
    };
    root.mutation[name] = {
        __args: args.signature,
        ...args.properties
    };
    const query = gql`
        ${jsonToGraphQLQuery(root)}
    `;
    const { mutate, onError, onDone, loading } = useMutation(query, () => ({
        update: (cache) => {
            let data = useCloned(
                cache.readQuery({
                    query: users,
                    variables: args.collection.value.vars
                })
            ).cloned.value;
            log(data);
            if (!data) return;
            data.users.collection = { ...data.users.collection, ...[args.item.value] };
            cache.writeQuery({ query: users, variables: args.collection.value.vars, data });
        }
    }));
    onError((e) => merror({ message: e, life: false }));

    return {
        mutate,
        onDone,
        loading
    };
}

export function deleteResource(name, getValue = {}) {
    const root = {
        mutation: {
            __name: name,
            __variables: {
                input: `${name}Input!`
            }
        }
    };
    root.mutation[name] = {
        __args: {
            input: new VariableType('input')
        },
        ...getValue
    };
    const query = gql`
        ${jsonToGraphQLQuery(root)}
    `;
    const { mutate, onError, onDone, loading } = useMutation(query);
    onError((e) => merror({ message: e, life: false }));

    return {
        mutate,
        onDone,
        loading
    };
}
