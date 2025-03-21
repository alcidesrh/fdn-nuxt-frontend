import { defineStore } from 'pinia';

import omit from 'ramda/es/omit';

export const useNacionStore = defineStore(
    'paisStore',
    () => {
        const { metadata, collection, item, formkitSchema, setFormkitSchema, remove, removeMultiple, resource } = createStore('Nacion');
        const naciones = ref([]);
        collection.value.vars = {
            page: 1,
            itemsPerPage: 15
        };

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
        function getNaciones() {
            if (naciones.value.length) {
                return naciones;
            }

            const { onResult } = apollo.collectionAgnostic(metadata.value.resource, ['id']);

            onResult(({ data, networkStatus }) => {
                if (typeof data == 'undefined' && networkStatus == 1) {
                    return;
                }
                naciones.value = data.collectionAgnostic.data.collection;
            });
        }
        return { metadata, collection, item, formkitSchema, submit, resource, remove, removeMultiple, setFormkitSchema, getNaciones, naciones };
    },
    {
        persist: {
            afterHydrate: (ctx) => {
                console.log(`just hydrated '${ctx.store.$id}'`);
            },
            beforeHydrate: (ctx) => {
                console.log(`about to hydrate '${ctx.store.$id}'`);
            }
        }
    }
);
