import type { FetchItemData } from '~~/types/api'
import type { Empresa } from '~~/types/empresa'
import { defineStore } from 'pinia'

interface State {
  retrieved?: Empresa
  isLoading: boolean
  error?: string
  hubUrl?: URL
}

export const useEmpresaShowStore = defineStore('empresaShow', {
  state: (): State => ({
    retrieved: undefined,
    isLoading: false,
    error: '',
    hubUrl: undefined,
  }),

  actions: {
    setData({ retrieved, isLoading, error, hubUrl }: FetchItemData<Empresa>) {
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

    setRetrieved(retrieved?: Empresa) {
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
