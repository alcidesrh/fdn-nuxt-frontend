import type { User } from '~/types/user'
import { defineStore } from 'pinia'

export const useUserStore = defineStore(
  'userStore',
  () => {
    const {
      collection,
      getItems,
      formkitSchema,
      setFormkitSchema,
      remove,
      removeMultiple,
      resource,
      entity,
      iniCollection,
      sortCollection,
    } = createStore<User>('User')

    entity.value.endpoints.get = 'getUserByUsernameUser'
    entity.value.excludeFields = [
      'password',
      'password_confirm',
      'userIdentifier',
      'validTokenStrings',
      'legacyId',
      'fullName',
    ]

    function submit() {
      // const { onDone, loading } =
      return apollo
        .mutate({
          operation: entity.value.getMutationOperation(),
          variables: { input: Entity.prepareVariables(entity.value.item) },
          fields: entity.value.getMutationFields(),
        })
        .then(({ data }) => {
          gLoading.value = false
          entity.value.item = data[entity.value.getMutationOperation()].user
          msg.emit(getAlertText('update'))
        })
        .catch((e) => {
          gLoading.value = false
          merror({ message: e, life: false })
        })
    }

    return {
      collection,
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
    }
  },
  // {
  //     persist: {
  //         afterHydrate: (ctx) => {
  //             console.log(`just hydrated '${ctx.store.$id}'`);
  //         },
  //         beforeHydrate: (ctx) => {
  //             console.log(`about to hydrate '${ctx.store.$id}'`);
  //         }
  //         // omit: ['collection']
  //     }
  // }
)
