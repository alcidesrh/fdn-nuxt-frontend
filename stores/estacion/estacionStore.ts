import { defineStore } from 'pinia';
import mergeDeepWith from 'ramda/es/mergeDeepWith';
import concat from 'ramda/es/concat';
import routes from '~/router.options';
import omit from 'ramda/es/omit';
import { Estacion } from '~/types/estacion';

export const useEstacionStore = defineStore('estacionStore', () => {
    const { metadata, collection, listGeneric, itemGeneric, formkitSchema, setFormkitSchemaGeneric, updateGeneric, getResourceGeneric, removeGeneric, reloadGeneric, removeMultiple, iniCollection, getResource } = createStore('estacion');

    let item: Ref<Estacion> = ref({}) as Ref<Estacion>;

    metadata.value.plural = 'estaciones';

    metadata.value.singular = 'estación';
    collection.value.query.name = 'estacions';

    collection.value.columnClass = (c: Record<string, string>) => {
        const temp = '';
        switch (c.name) {
            case 'id':
                return `${temp} pl-5 w-180px`;
            case 'nombre':
                return `${temp} w-250px`;
            case 'alias':
                return `${temp} w-250px`;
            case 'direccion':
                return `${temp} w-335px`;
            case 'status':
                return `${temp}  w-110px`;

            default:
                if (c.action) {
                    return `${temp} min-w-60px border-r border-surface-contrast-2`;
                }
                return `${temp} min-w-200px`;
        }
    };

    collection.value.filterInputClass = (input: any) => {
        const defaultClass = { outerClass: 'mb-0! ' };
        const temp = {
            texticon_fdn: {
                id: { outerClass: 'min-w-100px max-w-130px ' },
                username: { outerClass: 'max-w-200px! ' },
                fullName: { outerClass: 'max-w-200px ' },
                status: { outerClass: 'max-w-50px ' }
            },
            datepicker_fdn: {
                inputClass: { outerClass: 'max-w-315px! ' }
            }
        };
        if (temp[input.schema.$formkit]) {
            const classes = temp[input.schema.$formkit][input.schema.name] || {};
            const inputClass = temp[input.schema.$formkit]['inputClass'] || {};

            return mergeDeepWith(concat, classes, mergeDeepWith(concat, inputClass, defaultClass));
        }
        return {};
    };

    extractObjectField(routes.routes(), 'meta', 'estacion').forEach((i) => {
        if (typeof i.action != 'undefined' && typeof i.route != 'undefined' && typeof metadata.value.routes[i.action] != 'undefined') {
            metadata.value.routes[i.action] = i.route;
        }
    });

    function resource2(value) {
        const { result, loading, onError, onResult } = getResource(metadata.value.entity, 'slug', value);
        onResult(
            ({
                data: {
                    getResource: { resource }
                }
            }) => {
                // log(v);
                // const { data } = v;
                // if (typeof v == 'undefined' || typeof data == 'undefined') {
                //     return;
                // }
                const { y: scrollY } = useWindowScroll();
                scrollY.value = 0;
                item.value = useCloned(resource[0]).cloned.value;
            }
        );
    }

    function list() {
        listGeneric();
    }

    function reload() {
        reloadGeneric();
    }

    function remove() {
        const { onDone, mutate } = removeGeneric({ estacion: { id: true } });
        onDone(() => {
            msg.emit(`${item.value?.nombre} ha sido eliminada`);
            reload();
            const router = useRouter();
            router.push({ name: metadata.value.routes.list });
            return;
        });
        return mutate({ input: { id: item.value?.id } });
    }

    function resource(slug) {
        getResourceGeneric('findByFindOneByFieldResolverEstacion', ['id', '_id', 'nombre'], {
            signature: { value: new VariableType('value'), entity: new VariableType('entity'), field: new VariableType('field') },
            variables: { value: { entity: 'Estacion', field: 'slug', value: slug }, types: { entity: 'String', field: 'String', value: 'String' } }
        });
        return;
        getResourceGeneric('estacion', ['id', '_id', 'nombre'], {
            signature: { id: new VariableType('id') },
            variables: { value: { id: id }, types: { id: 'String' } }
        });
    }

    function setFormKitSchema() {
        setFormkitSchemaGeneric();
    }

    function update() {
        const { mutate, onDone } = updateGeneric({ properties: { estacion: { nombre: true } } });
        onDone(
            ({
                data: {
                    updateEstacion: { estacion }
                }
            }) => {
                const router = useRouter();
                reload();
                router.push({ name: metadata.value.routes.list });
            }
        );
        mutate({ input: omit(['__typename', '_id'], item.value) });
    }

    return { metadata, collection, list, item, formkitSchema, setFormKitSchema, update, resource, remove, reload, removeMultiple, iniCollection, resource2 };
});
