import { useChangeCase } from '@vueuse/integrations/useChangeCase';
import type { Ref } from 'vue';
import gql from 'graphql-tag';
import { useQuery } from '@vue/apollo-composable';
import * as gqlBuilder from 'gql-query-builder';
import { CollectionVars } from './useCollection';

export type Metadata = {
    resource: string;
    entity: string;
    singular: string;
    plural: string;
    updateQuery: string;
    deleteQuery: string;
    routes: {
        list: string;
        create: string;
        edit: string;
    };
};

export const createStore = (name: string) => {
    const { collection } = useCollection(name);

    let itemGeneric: Ref<{} | null> = ref(null);

    let formkitSchema = ref([]);
    let formkitFields = ref<Array<string>>(['']);

    const entity = useChangeCase(name, 'pascalCase').value;

    const metadata: Ref<Metadata> = ref({
        resource: name,
        entity: entity,
        singular: '',
        plural: '',
        updateQuery: `update${entity}`,
        deleteQuery: `delete${entity}`,
        routes: {
            list: '',
            create: '',
            edit: ''
        }
    });

    msgbus(`filterinput_${metadata.value.resource}`).on((v: any) => {
        collection.value.loading = v;
    });

    function list() {
        const { loading, onResult, variables } = apollo.collection(collection);

        onResult(({ data, networkStatus }) => {
            if (typeof data == 'undefined' && networkStatus == 1) {
                return;
            }
            collection.value.vars = variables as unknown as CollectionVars;
            const { y: scrollY } = useWindowScroll();
            scrollY.value = 0;
            const { collection: collectionResult, paginationInfo } = data[collection.value.query];
            collection.value.pagination = paginationInfo;
            collection.value.items = collectionResult;
            collection.value.loading = false;
        });

        watch(
            () => loading.value,
            (v) => {
                collection.value.loading = v;
            }
        );
    }

    async function setFormkitSchema(entity) {
        if (formkitSchema.value.length != 0) {
            return;
            // useFetchItem(`create_forms/${metadata.value.resource}`).then(({ retrieved }: any) => {
            //     formkitSchema.value = formkitClasses(retrieved.value['hydra:member']);
            // });
        }
        // const queryBuild = gqlBuilder.query({
        //     operation: 'getMetadataResource',
        //     fields: ['data'],
        //     variables: { entity: { type: 'String', value: entity } }
        // });
        // const queryGql: any = gql`
        //     ${queryBuild.query}
        // `;
        const { onResult, loading } = apollo.query('getMetadataResource', { entity: entity });

        onResult(({ data, networkStatus }) => {
            if (typeof data == 'undefined' && networkStatus == 1) {
                return;
            }
            formkitSchema.value = formkitClasses(data.getMetadataResource.data.form);
            formkitFields.value = data.getMetadataResource.data.fields;
        });
    }

    function resource(entity, field, value) {
        // const queryBuild = gqlBuilder.query({
        //     operation: 'getResource',
        //     fields: formkitFields.value,
        //     variables: { entity: { type: 'String', value: entity }, field: { type: 'String', value: field }, value: { type: 'String', value: value } }
        // });

        // const queryGql: any = gql`
        //     ${queryBuild.query}
        // `;
        // const { loading, onError, onResult } = useQuery(queryGql, queryBuild.variables, { fetchPolicy: 'network-only' });
        const variables = { entity: entity, field: field, value: value };
        log(formkitFields.value);
        const { loading, onResult } = apollo.query('getResource', variables, formkitFields.value, null, { fetchPolicy: 'network-only' });
        onResult(
            ({
                data: {
                    getResource: { user }
                }
            }) => {
                if (typeof user == 'undefined') {
                    return;
                }
                const { y: scrollY } = useWindowScroll();
                scrollY.value = 0;
                itemGeneric.value = useCloned(user).cloned.value;
            }
        );
    }

    function updateGeneric(params: any) {
        // Object.keys(item.value).forEach((value, index) => (temp[value] = true));
        return apollo.update(metadata.value.updateQuery, {
            types: { input: `${metadata.value.updateQuery}Input!` },
            signature: { input: new VariableType('input') },
            properties: params.properties,
            collection: collection,
            item: itemGeneric
        });
    }

    function remove(id) {
        const fields = {};
        fields[metadata.value.resource] = ['id'];
        const { onDone, loading, onError } = apollo.mutate(metadata.value.deleteQuery, [fields], { input: { id: id } }, metadata.value.entity);

        // const { mutate, onError, onDone, loading } = useMutation(query);

        onDone(() => {
            msg.emit(`Se ha sido eliminado correctamente`);
            // reload();
            const router = useRouter();
            router.push({ name: metadata.value.routes.list });
            return;
        });
    }

    function removeMultiple(items) {
        const fields = { multipleResource: ['id'] };

        const { onDone, loading, onError } = apollo.mutate('deleteMultipleResource', [fields], { input: { resource: metadata.value.entity, ids: items.map((i: any) => i._id) } }, 'deleteMultipleResource');

        // const { mutate, onError, onDone, loading } = useMutation(query);

        onDone(() => {
            msg.emit(`Se ha sido eliminado correctamente`);
            // reload();
            const router = useRouter();
            router.push({ name: metadata.value.routes.list });
            return;
        });
    }

    function iniCollection() {
        if (collection.value.columns.length) {
            return;
        }
        const { onResult, loading } = apollo.query('columnsMetadataResource', { entity: metadata.value.resource });

        onResult(({ data, networkStatus }) => {
            if (typeof data == 'undefined' && networkStatus == 1) {
                return;
            }
            collection.value.setColumns(data.columnsMetadataResource.data.collection);
            list();
        });
        watch(
            () => loading.value,
            (v) => {
                collection.value.loading = v;
            }
        );
    }

    function sort(d: string) {
        sortCollection(collection, d);
    }
    return { metadata, collection, list, itemGeneric, formkitSchema, formkitFields, setFormkitSchema, updateGeneric, remove, removeMultiple, iniCollection, resource, sort };
};
