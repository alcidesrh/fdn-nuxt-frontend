import { useChangeCase } from '@vueuse/integrations/useChangeCase';
import type { Ref } from 'vue';
import { Collection, CollectionVars } from './useCollection';
import { User, Menu } from '~/types';
import { Nacion } from '~/types/nacion';

export type Metadata = {
    resource: string;
    entity: string;
    singular: string;
    plural: string;
    query: {
        get: string;
        create: string;
        update: string;
        delete: string;
        collection: string;
    };
    updateExclude: Array<string>;
    routes: {
        list: string;
        create: string;
        edit: string;
    };
};

export type Store = {
    item: Ref<Menu, User>;
    formkitSchema: Ref<Array<Record<any, any>>>;
    metadata: Ref<Metadata>;
    collection: Ref<Collection>;
    setFormkitSchema: () => Record<any, any>;
    removeAgnostic: (id: string) => void;
    removeMultipleAgnostic: (ids: Array<string>) => void;
    iniCollection: () => void;
    resource: () => void;
    sort: (d: string) => void;
    getCollection: () => void;
    removeMultiple: (items: Ref<Array<any>>) => void;
    remove: (any) => void;
};
function getMetadata(name): Ref<Metadata> {
    const entity = useChangeCase(name, 'pascalCase').value;

    const camelCase = useChangeCase(name, 'camelCase').value;

    const pascalCase = useChangeCase(name, 'pascalCase').value;
    return ref({
        resource: camelCase,
        entity: entity,
        singular: camelCase,
        plural: camelCase + 's',
        query: {
            get: camelCase,
            collection: 'collection' + camelCase + 's',
            create: `create${pascalCase}`,
            update: `update${pascalCase}`,
            delete: `delete${pascalCase}`
        },
        updateExclude: ['label'],
        routes: {
            list: `${camelCase}_list`,
            create: `${camelCase}_create`,
            edit: `${camelCase}_edit`
        }
    });
}

export const createStore = (name: string) => {
    const entity = useChangeCase(name, 'pascalCase').value;

    const metadata = getMetadata(name);

    const { collection } = useCollection(entity) as unknown as Record<'collection', Ref<Collection>>;

    let item: Ref<Menu, User> = ref({});

    const formkitSchema = ref([]);

    function setFormkitSchema(returnQuery = false) {
        if (formkitSchema.value.length != 0) {
            return;
        }
        if (returnQuery) {
            return apollo.query('getMetadataResource', { resource: metadata.value.entity });
        }
        const { onResult, loading } = apollo.query('getMetadataResource', { resource: metadata.value.entity });
        onResult(({ data, networkStatus }) => {
            if (typeof data == 'undefined' && networkStatus == 1) {
                return;
            }
            formkitSchema.value = data.getMetadataResource.data.form;
        });
    }

    function resource(arg?) {
        if (!arg) {
            return false;
        }

        const fields = fdn.value.resourceFields(metadata.value.entity, metadata.value.updateExclude);

        if (typeof arg != 'object') {
            arg = { id: arg };
        }
        const { onResult, loading } = apollo.query(metadata.value.query.get, arg, fields, metadata.value.resource, { fetchPolicy: 'network-only' });

        onResult(({ data }) => {
            if (typeof data == 'undefined') {
                return;
            }
            let temp = data[metadata.value.query.get]; //['getUserByUsernameUser'];

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
            cl(temp);
            item.value = temp;
        });
    }
    let chanel = '';
    let unsubscribe: any;
    function unsubscribeChanel() {
        if (typeof unsubscribe != undefined && unsubscribe) {
            unsubscribe();
        }
    }
    function remove(arg?) {
        const temp = arg || item.value;
        unsubscribeChanel();
        chanel = random();
        msgbus('remove').emit({ chanel: chanel, header: 'Eliminar', message: getAlertText('remove', temp?.nombre || 'este elemento.') });
        unsubscribe = msgbus(chanel).on((v: any) => {
            unsubscribeChanel();
            const fields = {};
            fields[metadata.value.resource] = ['id'];
            const { onDone } = apollo.mutate(metadata.value.query.delete, fields, { input: { id: temp.id } }, 'delete' + metadata.value.entity);
            onDone(() => {
                msg.emit(getAlertText('remove_after'));
                collection.value.reload();
                const router = useRouter();
                router.push({ name: metadata.value.routes.list });
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
            const { onDone } = apollo.mutate('deleteAgnostic', fields, { input: { resource: metadata.value.entity, ids: temp.map((i: any) => i._id) } }, 'deleteAgnostic');
            onDone(() => {
                msg.emit(getAlertText('remove_after'));
                collection.value.reload();
                const router = useRouter();
                router.push({ name: metadata.value.routes.list });
                return;
            });
        });
    }

    return { metadata, collection, item, formkitSchema, setFormkitSchema, remove, removeMultiple, resource };
};
