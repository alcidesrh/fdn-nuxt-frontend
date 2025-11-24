import type { Role } from '~/types/role';
import { defineStore } from 'pinia';

export const useRoleStore = defineStore(
	'roleStore',
	() => {
		const {
			schema,
			setFormkitSchema,
			remove,
			removeMultiple,
			resource,
			items,
			getItems,
			entity,
			iniCollection,
			sortCollection,
			submit,
			getCollection,
		} = createStore<Role>('Role');

		const options = [];

		return {
			schema,
			submit,
			resource,
			remove,
			removeMultiple,
			setFormkitSchema,
			items,
			getItems,
			entity,
			iniCollection,
			sortCollection,
			options,
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
