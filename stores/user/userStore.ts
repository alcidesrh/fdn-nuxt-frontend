import { updateUser } from './../../graphql/queries';
import { defineStore } from 'pinia';
import { MenuItem } from 'primevue/menuitem';
import { users, columnsCollection } from '~~/graphql/queries';
import omit from 'ramda/es/omit';
import { VariableType } from '~/utils/json-to-graphql-query/src';
import { User } from '~/types/user';
export const useUserStore = defineStore(
    'userCollection',
    () => {
        const { collection, sort, highlighted } = collectionStore();
        let item: Ref<User | null> = ref(null);
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
            const { result, loading, refetch } = getCollection(users, collection);

            gqlQueryColumns(columnsCollection, { collection: collection, resource: resource });

            return { result, loading, refetch };
        }

        function editIni(id) {
            useFetchItem<MenuItem>('create_forms/user').then(({ retrieved }) => {
                const temp = formkitClasses(retrieved.value['hydra:member']);
                form.value = temp;
            });

            item.value = null;
            getResource('getUserByUsernameUser', ['id', '_id', 'nombre', 'username', 'apellido', 'telefono', 'email', 'nit', 'createdAt', 'updatedAt'], {
                reference: item,
                args: {
                    signature: { username: new VariableType('username') },
                    variables: { value: { username: id }, types: { username: 'String' } }
                }
            });
        }

        function update() {
            const { mutate, onDone, loading } = updateResource('updateUser', { types: { input: 'updateUserInput!' }, signature: { input: new VariableType('input') }, properties: { user: { username: true } }, collection: collection, item: item });
            onDone(
                ({
                    data: {
                        updateUser: { user }
                    }
                }) => {
                    const router = useRouter();
                    router.push({ name: 'usuario_collection' });
                }
            );
            mutate({ input: omit(['__typename', '_id'], item.value) });
        }

        function remove() {
            const { mutate, onDone, loading } = deleteResource('deleteUser', { user: { id: true } });
            onDone(
                ({
                    data: {
                        deleteUser: { user }
                    }
                }) => {
                    msg.emit(`${item.value?.username} ha sido eliminado`);
                    const router = useRouter();
                    router.push({ name: 'usuario_collection' });
                    return;
                }
            );
            return mutate({ input: { id: item.value?.id } });
        }
        msgbus(`filterinput_${resource}`).on((v: any) => {
            collection.value.loading = v;
        });
        return { collection, sort, ini, item, form, update, editIni, remove };
    },
    { persist: true }
);
