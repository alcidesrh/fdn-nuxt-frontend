import type { Venta } from '~~/types/venta'
import { defineStore } from 'pinia'

interface State {
  deleted?: Venta
  mercureDeleted?: Venta
  isLoading: boolean
  error?: string
}

export const useVentaDeleteStore = defineStore('ventaDelete', {
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

    setDeleted(deleted: Venta) {
      this.deleted = deleted
    },

    setMercureDeleted(mercureDeleted: Venta | undefined) {
      this.mercureDeleted = mercureDeleted
    },

    setError(error: string) {
      this.error = error
    },
  },
})
