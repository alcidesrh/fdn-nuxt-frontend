import { SelectOption } from '~/types/fdn';
import { defineStore } from 'pinia';
import omit from 'ramda/es/omit';
export const useUserStore = defineStore(
    'userStore',
    () => {
        const { metadata, collection, item, items, getItems, formkitSchema, setFormkitSchema, remove, removeMultiple, resource } = createStore('User');

        metadata.value.query.get = 'getUserByUsernameUser';

        metadata.value.updateExclude = [...metadata.value.updateExclude, ...['password', 'userIdentifier', 'validTokenStrings', 'legacyId', 'fullName']];

        const options: Ref<Array<SelectOption> | []> = ref([]);

        function submit() {
            const query = item.value.id ? metadata.value.query.update : metadata.value.query.create;
            const fields = {};
            fields[metadata.value.resource] = fdn.value.resourceFields(metadata.value.entity, metadata.value.updateExclude);
            const { onDone, loading } = apollo.mutate(query, omit(['permisos', 'fullName'], item.value), fields);
            gLoading.value = true;
            onDone((data) => {
                msg.emit(getAlertText('update'));
                collection.value.items = [];
                collection.value.reload();
                const router = useRouter();
                router.push({ name: metadata.value.routes.list });

                gLoading.value = false;
                return;
            });
        }

        return { metadata, collection, item, items, getItems, formkitSchema, submit, resource, remove, removeMultiple, setFormkitSchema };
    }
    // {
    //     persist: {
    //         afterHydrate: (ctx) => {
    //             console.log(`just hydrated '${ctx.store.$id}'`);
    //         },
    //         beforeHydrate: (ctx) => {
    //             console.log(`about to hydrate '${ctx.store.$id}'`);
    //         }
    //         // omit: ['collection']
    //     }
    // }
);
