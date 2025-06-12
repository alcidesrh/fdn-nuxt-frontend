import { defineStore } from 'pinia';
import { User } from '~/types/user';

export const useUserStore = defineStore(
    'userStore',
    () => {
        const { collection, getItems, formkitSchema, setFormkitSchema, remove, removeMultiple, resource, entity, iniCollection, sortCollection, submit } = createStore<User>('User');

        entity.value.endpoints.get = 'getUserByUsernameUser';
        entity.value.excludeFields = ['password', 'userIdentifier', 'validTokenStrings', 'legacyId', 'fullName'];

        return { collection, getItems, formkitSchema, submit, resource, remove, removeMultiple, setFormkitSchema, entity, iniCollection, sortCollection };
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
