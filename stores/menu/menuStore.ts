import { defineStore } from 'pinia';

import { Menu } from '~/types/menu';
import omit from 'ramda/es/omit';
import { SelectOption } from '~/types/fdn';

export const useMenuStore = defineStore(
    'menuStore',
    () => {
        const { metadata, collection, item, formkitSchema, setFormkitSchema: setFormkitSchemaAgnostic, remove, removeMultiple, resource } = createStore('Menu');

        const options: Ref<Array<SelectOption> | []> = ref([]);

        function setFormkitSchema() {
            if (formkitSchema.value.length != 0) {
                return;
            }
            const { onResult, loading } = setFormkitSchemaAgnostic(true) as any;
            onResult(({ data, networkStatus }) => {
                if (typeof data == 'undefined' && networkStatus == 1) {
                    return;
                }
                formkitSchema.value = data.getMetadataResource.data.form;
                options.value = data.getMetadataResource.data.options;
            });
        }

        function filterValues() {
            const val = omit(['permisos', '__typename', '_id'], item.value);
            Object.keys(val).forEach((i) => {
                if (val[i] && typeof val[i] == 'object') {
                    if (typeof val[i].collection != 'undefined') {
                        val[i] = val[i].collection.map((v) => v?.id || v);
                    } else {
                        val[i] = val[i]?.id || val[i]?.value || val[i];
                    }
                }
            });
            cl(val);

            return val;
        }
        function submit() {
            const query = item.value.id ? metadata.value.query.update : metadata.value.query.create;
            const fields = {};
            fields[metadata.value.resource] = fdn.value.resourceFields(metadata.value.entity);
            const vars = filterValues();

            const { onDone, loading } = apollo.mutate(query, fields, { input: vars });

            gLoading.value = true;
            onDone((data) => {
                msg.emit(getAlertText('update'));
                collection.value.reload();
                const router = useRouter();
                router.push({ name: metadata.value.routes.list });

                gLoading.value = false;
                return;
            });
        }

        return { metadata, collection, item, formkitSchema, submit, resource, remove, removeMultiple, setFormkitSchema, options };
    }
    // {
    //     persist: {
    //         afterHydrate: (ctx) => {
    //             console.log(`just hydrated '${ctx.store.$id}'`);
    //         },
    //         beforeHydrate: (ctx) => {
    //             console.log(`about to hydrate '${ctx.store.$id}'`);
    //         }
    //     }
    // }
);
