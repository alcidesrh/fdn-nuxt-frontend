import { defineStore } from 'pinia';
import { User } from '~/types/user';
import { getApiResources } from '~/types';
// import { parseGraphQl } from '@api-platform/api-doc-parser';
import { parseGraphQl } from '~/graphql/parse/src';
import { Entity } from '~/graphql/parse/src/graphql/parseGraphQl';
import { SettingOptions } from '~/types/settingoptions';
import { SettingResource } from '~/types/settingresource';

interface State {
    entities: Ref<string[]>;
    openEntityList: Ref<boolean>;
}
export const useAdminStore = defineStore('Admin', {
    persist: {
        afterHydrate: (ctx) => {
            console.log(`just hydrated '${ctx.store.$id}'`);
        },
        beforeHydrate: (ctx) => {
            console.log(`about to hydrate '${ctx.store.$id}'`);
        }
    },
    state: (): State => ({
        entities: ref([]),
        openEntityList: ref(false)
    }),
    actions: {
        getEntities() {
            const { onResult, loading } = apollo.query({ operation: 'entitiesSettingResource', fields: Entity.prepareField(fdn.value.queries['entitiesSettingResource']).entitiesSettingResource });

            onResult(({ data, networkStatus }) => {
                if (typeof data == 'undefined' && networkStatus == 1) {
                    return;
                }
                // let temp: any = { name: 'Entidades', children: data.entitiesSettingResource.list.map((v) => ({ name: v, link: 'v.id' })) };
                this.entities = data.entitiesSettingResource.list;
            });
        }
    }
});
