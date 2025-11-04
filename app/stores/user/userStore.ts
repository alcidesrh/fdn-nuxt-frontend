import type { User } from '~/types/user';
import { defineStore } from 'pinia';

export const useUserStore = defineStore(
	'userStore',
	() => {
		const {
			getItems,
			formkitSchema,
			setFormkitSchema,
			remove,
			removeMultiple,
			resource,
			entity,
			iniCollection,
			sortCollection,
			getCollection,
		} = createStore<User>('User');

		// entity.value.endpoints.get = 'getUserByUsernameUser';
		entity.value.excludeFormFields = [
			// 'password',
			'password_confirm',
			'userIdentifier',
			'validTokenStrings',
			'legacyId',
			'fullName',
			// 'roles',
		];

		function submit(data) {
			// const { onDone, loading } =
			cl(data);

			return apollo
				.mutate({
					operation: entity.value.getMutationOperation(),
					variables: { input: Entity.prepareVariables(data) },
					fields: entity.value.getMutationFields(),
				})
				.then(({ data }) => {
					entity.value.item = data[entity.value.getMutationOperation()].user;
					msg.emit(getAlertText('update'));
				})
				.catch((e) => {
					merror({ message: e, life: false });
				});
		}

		return {
			getItems,
			formkitSchema,
			submit,
			resource,
			remove,
			removeMultiple,
			setFormkitSchema,
			entity,
			iniCollection,
			sortCollection,
			getCollection,
		};
	},
	{
		persist: {
			afterHydrate: (ctx) => {
				console.log(`just hydrated '${ctx.store.$id}'`);
			},
			beforeHydrate: (ctx) => {
				console.log(`about to hydrate '${ctx.store.$id}'`);
			},
			// omit: ['collection']
		},
	},
);
