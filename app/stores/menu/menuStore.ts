import type { Menu } from '~/types/menu'
import { defineStore } from 'pinia'

export const useMenuStore = defineStore(
  'menuStore',
  () => {
    const { collection, getItems, formkitSchema, setFormkitSchema, remove, removeMultiple, resource, entity, iniCollection, sortCollection, submit, items, getCollection } = createStore<Menu>('Menu')

      const { onResult, loading } = apollo.query({ endpoint: 'columnsMetadataResource', args: { resource: this.resource } })

      onResult(({ data, networkStatus }) => {
        if (typeof data == 'undefined' && networkStatus == 1) {
          return
        }

        this.setColumns(data.columnsMetadataResource.data)
        this.getCollection()
      })
      watch(
        () => loading.value,
        (v) => {
          collection.value.loading = v
        },
      )
    }

    function getMenu() {
      const { onResult, loading } = apollo.query('getMenu', { tipo: 'root' })

      onResult(({ data, networkStatus }) => {
        if (typeof data == 'undefined' && networkStatus == 1) {

        }
      })
    }
    return { collection, formkitSchema, submit, resource, remove, removeMultiple, setFormkitSchema, getItems, getMenu, entity, iniCollection, sortCollection, items , getCollection}
  },
  {
      persist: {
          afterHydrate: (ctx) => {
              console.log(`just hydrated '${ctx.store.$id}'`);
          },
          beforeHydrate: (ctx) => {
              console.log(`about to hydrate '${ctx.store.$id}'`);
          }
      }
  }
)
