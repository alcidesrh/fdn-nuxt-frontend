import type { FDN } from '~~/types/fdn'
import { defineStore } from 'pinia'

interface State {
  deleted?: FDN
  mercureDeleted?: FDN
  isLoading: boolean
  error?: string
}

export const useFDNDeleteStore = defineStore('fdnDelete', {
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

    setDeleted(deleted: FDN) {
      this.deleted = deleted
    },

    setMercureDeleted(mercureDeleted: FDN | undefined) {
      this.mercureDeleted = mercureDeleted
    },

    setError(error: string) {
      this.error = error
    },
  },
})
