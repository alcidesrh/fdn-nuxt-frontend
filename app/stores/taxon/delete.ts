import type { Taxon } from '~~/types/taxon'
import { defineStore } from 'pinia'

interface State {
  deleted?: Taxon
  mercureDeleted?: Taxon
  isLoading: boolean
  error?: string
}

export const useTaxonDeleteStore = defineStore('taxonDelete', {
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

    setDeleted(deleted: Taxon) {
      this.deleted = deleted
    },

    setMercureDeleted(mercureDeleted: Taxon | undefined) {
      this.mercureDeleted = mercureDeleted
    },

    setError(error: string) {
      this.error = error
    },
  },
})
