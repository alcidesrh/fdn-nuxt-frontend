import type { Menu } from '~/types/menu';
import { defineStore } from 'pinia';

export const useMenuStore = defineStore(
	'menuStore',
	() => {
		const {
			items,
			getItems,
			schema,
			setFormkitSchema,
			remove,
			removeMultiple,
			resource,
			entity,
			iniCollection,
			sortCollection,
			submit,
			getCollection,
		} = createStore<Menu>('Menu');

		return {
			items,
			schema,
			submit,
			resource,
			remove,
			removeMultiple,
			setFormkitSchema,
			getItems,
			entity,
			iniCollection,
			sortCollection,
			getCollection,
		};
	},
	// {
	// 	persist: {
	// 		afterHydrate: (ctx) => {
	// 			console.log(`just hydrated '${ctx.store.$id}'`);
	// 		},
	// 		beforeHydrate: (ctx) => {
	// 			console.log(`about to hydrate '${ctx.store.$id}'`);
	// 		},
	// 	},
	// },
);
