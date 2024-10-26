import { defineStore } from 'pinia';
import { User } from '~/graphql/graphql';
import { user, users, columnsCollection } from '~~/graphql/queries';

export const useUserStore = defineStore(
    'userCollection',
    () => {
        const { collection, sort, highlighted } = collectionStore();
        let item: Ref<User> = ref({} as User);
        let form = ref([]);
        const resource = 'user';
        collection.value.label = 'usuario';

        watch(
            () => collection.value.items,
            () => {
                nextTick(() => highlighted());
            }
        );

        function ini() {
            getCollection(users, collection);

            gqlQueryColumns(columnsCollection, { collection: collection, resource: resource });
        }

        function getItem(query, id) {
            gqlQueryResource(query, id, { item: item, resource: resource });
        }

        msgbus(`filterinput_${resource}`).on((v: any) => {
            collection.value.loading = v;
        });
        return { collection, sort, ini, getItem, item, form };
    },
    { persist: true }
);
