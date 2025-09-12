import type { FetchAllData } from '~~/types/api'
import type { Salida } from '~~/types/salida'
import type { View } from '~~/types/view'
import { defineStore } from 'pinia'

interface State {
  items: Salida[]
  hubUrl?: URL
  isLoading: boolean
  view?: View
  error?: string
}

export const useSalidaListStore = defineStore('salidaList', {
  state: (): State => ({
    items: [],
    isLoading: false,
    error: undefined,
    hubUrl: undefined,
    view: undefined,
  }),

  actions: {
    setData({ items, view, isLoading, error, hubUrl }: FetchAllData<Salida>) {
      this.setItems(items.value)
      this.setLoading(isLoading.value)
      if (hubUrl)
        this.setHubUrl(hubUrl.value)
      if (view)
        this.setView(view.value)

      if (error.value instanceof Error) {
        this.setError(error.value?.message)
      }
    },

    setLoading(isLoading: boolean) {
      this.isLoading = isLoading
    },

    setItems(items: Salida[]) {
      this.items = items
    },

    setHubUrl(hubUrl?: URL) {
      this.hubUrl = hubUrl
    },

    setView(view?: View) {
      this.view = view
    },

    setError(error?: string) {
      this.error = error
    },

    updateItem(updatedItem: Salida) {
      const item: Salida | undefined = this.items.find(
        i => i['@id'] === updatedItem['@id'],
      )

      if (!item)
        return

      Object.assign(item, updatedItem)
    },

    deleteItem(deletedItem: Salida) {
      this.items = this.items.filter((item) => {
        return item['@id'] !== deletedItem['@id']
      })
    },
  },
})
