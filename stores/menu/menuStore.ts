import { defineStore } from 'pinia';

export const useMenuStore = defineStore(
    'menuStore',
    () => {
        const { metadata, collection, item, items, getItems, formkitSchema, setFormkitSchema, remove, removeMultiple, resource, form } = createStore('Menu');

        function submit(v = null) {
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
                getItems(true);
                return;
            });
        }

        return { metadata, collection, item, formkitSchema, submit, resource, remove, removeMultiple, setFormkitSchema, items, getItems, form };
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
