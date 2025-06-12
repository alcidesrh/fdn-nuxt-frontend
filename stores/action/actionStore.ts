import { defineStore } from 'pinia';
import { Action } from '~/types/action';

export const useActionStore = defineStore(
    'actionStore',
    () => {
        const { collection, items, getItems, formkitSchema, setFormkitSchema, remove, removeMultiple, resource, entity, iniCollection, sortCollection, submit } = createStore<Action>('Action');

        return { collection, formkitSchema, submit, resource, remove, removeMultiple, setFormkitSchema, items, getItems, entity, iniCollection, sortCollection };
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
