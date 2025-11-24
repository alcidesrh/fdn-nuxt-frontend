import type { Nacion } from '~/types/nacion';
import { defineStore } from 'pinia';

export const useNacionStore = defineStore(
	'paisStore',
	() => {
		const {
			collection,
			schema,
			setFormkitSchema,
			remove,
			removeMultiple,
			resource,
			items,
			getItems,
			entity,
			submit,
		} = createStore<Nacion>('Nacion');

		collection.value.vars = {
			page: 1,
			itemsPerPage: 15,
		};

		return {
			collection,
			schema,
			submit,
			resource,
			remove,
			removeMultiple,
			setFormkitSchema,
			items,
			getItems,
			entity,
		};
	},
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
