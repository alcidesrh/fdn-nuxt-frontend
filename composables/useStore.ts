import type { Ref } from 'vue';
import { User, Menu } from '~/types';
import { SelectOption } from '~/types/fdn';
import { Collection } from '~/types/collection';
import { Entity } from '~/graphql/parse/src/graphql/parseGraphQl';

export const createStore = <Type>(name: string) => {
    const collection: Ref<Collection> = ref({
        resource: name,
        menu: 'editar',
        columns: [],
        pagination: {} as any,
        items: [],
        orderField: 'id',
        orderType: 'ASC',
        loading: false,
        hasFilter: false,
        vars: {
            page: 1,
            itemsPerPage: 15,
            order: [{ id: 'ASC' }]
        }
    });
    const items: Ref<Array<SelectOption> | []> = ref([]);

    const entity = ref(new Entity<Type>(name));

    const formkitSchema = ref([]);

    let chanel = '';

    let unsubscribe: any;

    function setFormkitSchema(args = null) {
        entity.value.item = {} as any;
        (async (params) => {
            if (formkitSchema.value.length == 0) {
                await ((params) => Promise.resolve(apollo.query(params)))(params).then(({ onResult }) => {
                    onResult(({ data, networkStatus }) => {
                        if (typeof data == 'undefined' && networkStatus == 1) {
                            return;
                        }
                        formkitSchema.value = useCloned(data[entity.value.endpoints.form].schema).cloned.value;
                    });
                });
            }
            if (args) {
                resource(args);
            } else {
                entity.value.item = {};
            }
        })({ operation: entity.value.endpoints.form, variables: { entity: entity.value.name }, fields: ['schema'] });
    }
    function resource(variables?) {
        if (!variables) {
            return false;
        }
        if (typeof variables != 'object') {
            args = { id: args };
        }

        if (variables.id) {
            variables.id = entity.value.getIriFromId(variables.id);
        }

        const params = { operation: entity.value.endpoints.get, variables: variables, poptions: { fetchPolicy: 'network-only' }, fields: entity.value.getQueryFields() };
        const { onResult, loading } = apollo.query(params);

        onResult(({ data }) => {
            if (typeof data == 'undefined') {
                return;
            }
            let temp = data[entity.value.endpoints.get];
            const { y: scrollY } = useWindowScroll();
            scrollY.value = 0;
            temp = useCloned(temp).cloned.value;
            Object.keys(temp).forEach((v) => {
                if (typeof temp[v] == 'object') {
                    if (typeof temp[v]?.collection != 'undefined') {
                        temp[v] = temp[v].collection.map((v) => v?.id || v);
                    }
                    // else if (typeof temp[v]?.id != 'undefined') {
                    // temp[v] = temp[v].id;
                    // }
                }
            });
            entity.value.item = temp;
            if (typeof entity.value.item.id == 'undefined') {
                entity.value.item.id = getIriFromId(entity.value.item._id, entity.value.name);
            }
        });
    }
    function unsubscribeChanel() {
        if (typeof unsubscribe != undefined && unsubscribe) {
            unsubscribe();
        }
    }
    function remove(arg?) {
        const temp = arg || entity.value.item;
        unsubscribeChanel();
        chanel = random();
        msgbus('remove').emit({ chanel: chanel, header: 'Eliminar', message: getAlertText('remove', temp?.nombre || 'este elemento.') });
        unsubscribe = msgbus(chanel).on((v: any) => {
            unsubscribeChanel();
            const fields = {};
            fields[entity.value.camelCase] = ['id'];
            const { onDone } = apollo.remove(entity.value.endpoints.delete, { id: getIriFromId(temp._id, entity.value.name) }, fields);
            onDone(() => {
                msg.emit(getAlertText('remove_after'));
                reload();
                const router = useRouter();
                router.push({ name: entity.value.routes.list });
                return;
            });
        });
    }
    function removeMultiple(items: Ref<[any]> | any) {
        unsubscribeChanel();
        chanel = random();
        let text = '';

        text = getAlertText('remove', `${items.value.length} elementos`);

        msgbus('remove').emit({ chanel: chanel, message: text });
        unsubscribe = msgbus(chanel).on((v: any) => {
            unsubscribeChanel();
            const fields = { agnostic: ['id'] };
            const temp = Array.isArray(items.value) ? items.value : [items];
            const { onDone } = apollo.remove('deleteAgnostic', { resource: entity.value.name, ids: temp.map((i: any) => i._id) }, fields);
            onDone(() => {
                msg.emit(getAlertText('remove_after'));
                reload();
                const router = useRouter();
                router.push({ name: entity.value.routes.list });
                return;
            });
        });
    }
    function getItems(force = false) {
        if (!force && items.value.length != 0) {
            return;
        }
        const { onResult } = apollo.collectionAgnostic(entity.value.name);

        onResult(({ data, networkStatus }) => {
            if (typeof data == 'undefined' && networkStatus == 1) {
                return;
            }
            items.value = data.collectionAgnostic.data.collection;
        });
    }
    function iniCollection() {
        if (collection.value.columns.length) {
            getCollection();
            return;
        }
        const { onResult, loading } = apollo.query({ operation: 'columnsMetadataResource', variables: { resource: entity.value.name }, fields: ['data'] });
        onResult(({ data, networkStatus }) => {
            if (typeof data == 'undefined' && networkStatus == 1) {
                return;
            }
            entity.value.setColumns(data.columnsMetadataResource.data.collection.map((v) => v.name));
            setColumns(data.columnsMetadataResource.data);
            getCollection();
        });
        watch(
            () => loading.value,
            (v) => {
                collection.value.loading = v;
            }
        );
    }
    function setColumns(data) {
        collection.value.hasFilter = data.filter as boolean;
        collection.value.columns = (data.collection as any).map((i) => {
            let temp: any = useCloned(i).cloned.value;
            if (temp.schema) {
                const eventbus = `filterinput_${temp.schema.name}_resource`;
                temp.schema = { ...temp.schema, ...{ eventbus: eventbus } };
                collection.value.vars[temp.schema.name] = null;

                msgbus(eventbus).on((v: any) => {
                    collection.value.loading = v;
                });
            }

            return temp;
        });
    }
    function reload() {
        getCollection({ fetchPolicy: 'network-only' });
    }
    function sortCollection(d: string) {
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
            order[collection.value.orderField] = collection.value.orderType;
            collection.value.vars.order = [order];
        }
    }
    function getCollection(fetchPolicy = {}) {
        const { loading, onResult } = apollo.collection(collection, entity.value.getColumnsFields(), fetchPolicy);
        onResult(({ data, networkStatus }) => {
            if (typeof data == 'undefined' && networkStatus == 1) {
                return;
            }
            const { y: scrollY } = useWindowScroll();
            scrollY.value = 0;
            const { collection: collectionResult, paginationInfo } = data[getCollectionQuery(collection.value.resource)];
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
    function submit() {
        const { onDone, loading } = apollo.mutate({ operation: entity.value.getCrudOperation(), variables: { input: Entity.prepareVariables(entity.value.item) }, fields: entity.value.getMutationFields() });
        gLoading.value = true;
        onDone((data) => {
            entity.value.item = {} as any;
            msg.emit(getAlertText('update'));
            reload();
            const router = useRouter();
            router.push({ name: entity.value.routes.list });
        });
    }
    watch(
        () => collection.value.items,
        () => {
            nextTick(() => highlighted(collection));
        }
    );
    msgbus(`filterinput_${resource}`).on((v: any) => {
        collection.value.loading = v;
    });
    return { collection, getItems, formkitSchema, setFormkitSchema, remove, removeMultiple, resource, entity, iniCollection, sortCollection, submit, items };
};
