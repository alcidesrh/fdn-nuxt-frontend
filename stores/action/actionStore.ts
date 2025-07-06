import { defineStore } from 'pinia';
import { Action } from '~/types/action';

export const useActionStore = defineStore(
    'actionStore',
    () => {
        return createStore<Action>('Action');
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
