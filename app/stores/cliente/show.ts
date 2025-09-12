import type { FetchItemData } from '~~/types/api'
import type { Cliente } from '~~/types/cliente'
import { defineStore } from 'pinia'

interface State {
  retrieved?: Cliente
  isLoading: boolean
  error?: string
  hubUrl?: URL
}

export const useClienteShowStore = defineStore('clienteShow', {
  state: (): State => ({
    retrieved: undefined,
    isLoading: false,
    error: '',
    hubUrl: undefined,
  }),

  actions: {
    setData({ retrieved, isLoading, error, hubUrl }: FetchItemData<Cliente>) {
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

    setRetrieved(retrieved?: Cliente) {
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
