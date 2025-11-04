import type { Action } from '~/types/action';
import { defineStore } from 'pinia';

export const useActionStore = defineStore(
	'actionStore',
	() => {
		return createStore<Action>('Action');
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
