import type { Permiso } from '~/types/permiso';
import { defineStore } from 'pinia';

export const usePermisoStore = defineStore(
	'permisoStore',
	() => {
		// const { collection, formkitSchema, setFormkitSchema, remove, removeMultiple, resource, items, getItems, entity, iniCollection, sortCollection, submit } =
		return createStore<Permiso>('Permiso');
	},
	{
		persist: {
			afterHydrate: (ctx) => {
				console.log(`just hydrated '${ctx.store.$id}'`);
			},
			beforeHydrate: (ctx) => {
				console.log(`about to hydrate '${ctx.store.$id}'`);
			},
		},
	},
);
