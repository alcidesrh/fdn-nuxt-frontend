import type { FetchItemData } from '~~/types/api'
import type { RecorridoAsientoPrecio } from '~~/types/recorridoasientoprecio'
import { defineStore } from 'pinia'

interface State {
  retrieved?: RecorridoAsientoPrecio
  isLoading: boolean
  error?: string
  hubUrl?: URL
}

export const useRecorridoAsientoPrecioShowStore = defineStore(
  'recorridoasientoprecioShow',
  {
    state: (): State => ({
      retrieved: undefined,
      isLoading: false,
      error: '',
      hubUrl: undefined,
    }),

    actions: {
      setData({
        retrieved,
        isLoading,
        error,
        hubUrl,
      }: FetchItemData<RecorridoAsientoPrecio>) {
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

      setRetrieved(retrieved?: RecorridoAsientoPrecio) {
        this.retrieved = retrieved
      },

      setHubUrl(hubUrl?: URL) {
        this.hubUrl = hubUrl
      },

      setError(error?: string) {
        this.error = error
      },
    },
  },
)
