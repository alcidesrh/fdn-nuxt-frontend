import type { FetchItemData } from '~~/types/api'
import type { BoletoLog } from '~~/types/boletolog'
import { defineStore } from 'pinia'

interface State {
  retrieved?: BoletoLog
  isLoading: boolean
  error?: string
  hubUrl?: URL
}

export const useBoletoLogShowStore = defineStore('boletologShow', {
  state: (): State => ({
    retrieved: undefined,
    isLoading: false,
    error: '',
    hubUrl: undefined,
  }),

  actions: {
    setData({ retrieved, isLoading, error, hubUrl }: FetchItemData<BoletoLog>) {
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

    setRetrieved(retrieved?: BoletoLog) {
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
