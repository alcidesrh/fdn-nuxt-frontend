import { defineStore } from 'pinia';

export interface SidebarState {
    mode: Ref<string>;
    position: string;
}

const definedStores = new Map<string, ReturnType<typeof defineSidebarStore>>();

const sidebarStoreFactory = (storeId: string, position: string) => {
    if (!definedStores.has(storeId)) {
        definedStores.set(storeId, defineSidebarStore(storeId, position));
    }

    return definedStores.get(storeId) as ReturnType<typeof defineSidebarStore>;
};

function defineSidebarStore<Id extends string, Position extends string>(storeId: Id, position: Position) {
    return defineStore(storeId, {
        persist: true,
        state: (): SidebarState => {
            return {
                mode: ref(isMobil.value ? 'close' : 'normal'),
                position: position
            };
        },
        getters: {
            modeStates: (state) => {
                return {
                    normal: `normal`,
                    small: `small`,
                    onhover: `onhover`,
                    close: `close`
                };
            }
        }
        /* ...*/
    });
}
export const useSidebarStore = (storeId: string, position = 'left') => {
    return sidebarStoreFactory(storeId, position)();
};
