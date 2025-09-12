import type { FetchItemData } from '~~/types/api'
import type { Factura } from '~~/types/factura'
import { defineStore } from 'pinia'

interface State {
  retrieved?: Factura
  isLoading: boolean
  error?: string
  hubUrl?: URL
}

export const useFacturaShowStore = defineStore('facturaShow', {
  state: (): State => ({
    retrieved: undefined,
    isLoading: false,
    error: '',
    hubUrl: undefined,
  }),

  actions: {
    setData({ retrieved, isLoading, error, hubUrl }: FetchItemData<Factura>) {
      this.setRetrieved(retrieved.value)
      this.setLoading(isLoading.value)
      this.setHubUrl(hubUrl.value)

      if (error.value instanceof Error) {
        this.setError(error.value?.message)
      }
    },

    setLoading(isLoading: boolean) {
      this.isLoading = isLoading
    },

    setRetrieved(retrieved?: Factura) {
      this.retrieved = retrieved
    },

    setHubUrl(hubUrl?: URL) {
      this.hubUrl = hubUrl
    },

    setError(error?: string) {
      this.error = error
    },
  },
})
