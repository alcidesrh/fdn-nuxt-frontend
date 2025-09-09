import { defineStore } from "pinia";
import type { User } from "~/types/user";
// import { parseGraphQl } from '@api-platform/api-doc-parser';
import { parseGraphQl } from "~/graphql/parse/src";

interface State {
	api: Ref<Record<"User" | any, User | any>> | null;
}
export const useMetadataStore = defineStore("Metadata", {
	// persist: {
	//     afterHydrate: (ctx) => {
	//         console.log(`just hydrated '${ctx.store.$id}'`);
	//     },
	//     beforeHydrate: (ctx) => {
	//         console.log(`about to hydrate '${ctx.store.$id}'`);
	//     }
	// },
	state: (): State => ({
		api: null //ref({} as Record<'User', User>)
	}),
	actions: {
		async setApiMetadata() {
			if (!Object.keys(this.api || {}).length) {
				await parseGraphQl(ENTRYPOINT_GRAPHQL)
					.then(({ resources, queries, mutations, payload, input }: any) => {
						fdn.value.mutations = mutations;
						fdn.value.queries = queries;
						fdn.value.resources = resources;
						fdn.value.payload = payload;
						fdn.value.input = input;
					})
					.catch(e => {
						// this.api = getApiResources();
					});
			}
			// api.value.api = this.api;
		}
	}
});
