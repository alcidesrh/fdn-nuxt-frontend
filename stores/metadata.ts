import { defineStore } from 'pinia';
import { parseGraphQl } from '@api-platform/api-doc-parser';
import { User } from '~/types/user';
import { getApiResources } from '~/types';

interface State {
    api: Ref<Record<'User' | any, User | any>> | null;
}
export const useMetadataStore = defineStore('Metadata', {
    persist: {
        afterHydrate: (ctx) => {
            console.log(`just hydrated '${ctx.store.$id}'`);
        },
        beforeHydrate: (ctx) => {
            console.log(`about to hydrate '${ctx.store.$id}'`);
        }
    },
    state: (): State => ({
        api: null //ref({} as Record<'User', User>)
    }),
    actions: {
        async setApiMetadata() {
            if (!Object.keys(this.api || {}).length) {
                await parseGraphQl(ENTRYPOINT_GRAPHQL)
                    .then(({ api }: any) => {
                        this.api = getApiResources(api);
                    })
                    .catch((e) => {
                        this.api = getApiResources();
                    });
            }
            fdn.value.api = this.api;
        }
    }
});
