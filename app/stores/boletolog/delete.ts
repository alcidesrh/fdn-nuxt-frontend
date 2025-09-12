import type { BoletoLog } from '~~/types/boletolog'
import { defineStore } from 'pinia'

interface State {
  deleted?: BoletoLog
  mercureDeleted?: BoletoLog
  isLoading: boolean
  error?: string
}

export const useBoletoLogDeleteStore = defineStore('boletologDelete', {
  state: (): State => ({
    deleted: undefined,
    mercureDeleted: undefined,
    isLoading: false,
    error: undefined,
  }),

  actions: {
    setLoading(isLoading: boolean) {
      this.isLoading = isLoading
    },

    setDeleted(deleted: BoletoLog) {
      this.deleted = deleted
    },

    setMercureDeleted(mercureDeleted: BoletoLog | undefined) {
      this.mercureDeleted = mercureDeleted
    },

    setError(error: string) {
      this.error = error
    },
  },
})
