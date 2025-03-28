import { defineStore } from 'pinia';

import { SelectOption } from '~/types/fdn';

export const useRoleStore = defineStore(
    'roleStore',
    () => {
        const { metadata, collection, item, formkitSchema, setFormkitSchema: setFormkitSchemaAgnostic, remove, removeMultiple, resource } = createStore('Role');

        const options: Ref<Array<SelectOption> | []> = ref([]);

        function getRoles() {
            const { onResult } = apollo.collectionAgnostic(metadata.value.resource);

            onResult(({ data, networkStatus }) => {
                if (typeof data == 'undefined' && networkStatus == 1) {
                    return;
                }
                options.value = data.collectionAgnostic.data.collection;
            });
        }

        function setFormkitSchema() {
            if (formkitSchema.value.length != 0) {
                return;
            }
            getRoles();
            const { onResult, loading } = setFormkitSchemaAgnostic(true) as any;
            onResult(({ data, networkStatus }) => {
                if (typeof data == 'undefined' && networkStatus == 1) {
                    return;
                }
                formkitSchema.value = data.getMetadataResource.data.form;
            });
        }

        function submit() {
            const query = item.value.id ? metadata.value.query.update : metadata.value.query.create;
            const fields = {};
            fields[metadata.value.resource] = fdn.value.resourceFields(metadata.value.entity);
            const { onDone, loading } = apollo.mutate(query, item.value, fields);

            gLoading.value = true;
            onDone((data) => {
                msg.emit(getAlertText('update'));
                collection.value.reload();
                const router = useRouter();
                router.push({ name: metadata.value.routes.list });
                gLoading.value = false;
                getRoles();
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
