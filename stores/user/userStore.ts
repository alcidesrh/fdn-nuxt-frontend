import { defineStore } from 'pinia';

import mergeDeepWith from 'ramda/es/mergeDeepWith';
import concat from 'ramda/es/concat';
import { User } from '~/types/user';
import omit from 'ramda/es/omit';

export const useUserStore = defineStore(
    'userStore',
    () => {
        const { metadata, collection, item, formkitSchema, setFormkitSchema, remove, removeMultiple, resource } = createStore('User');

        metadata.value.query.get = 'getUserByUsernameUser';

        function filterValues() {
            const val = omit(['permisos', '__typename', '_id'], item.value);
            Object.keys(val).forEach((i) => {
                if (typeof val[i] == 'object') {
                    val[i] = val[i]?.id || val[i]?.value || val[i];
                }
            });
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
                collection.value.items = [];
                collection.value.reload();
                const router = useRouter();
                router.push({ name: metadata.value.routes.list });

                gLoading.value = false;
                return;
            });
        }

        return { metadata, collection, item, formkitSchema, submit, resource, remove, removeMultiple, setFormkitSchema };
    },
    {
        persist: {
            afterHydrate: (ctx) => {
                console.log(`just hydrated '${ctx.store.$id}'`);
            },
            beforeHydrate: (ctx) => {
                console.log(`about to hydrate '${ctx.store.$id}'`);
            }
            // omit: ['collection']
        }
    }
);
