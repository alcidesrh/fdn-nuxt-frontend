import type { RecorridoAsientoPrecio } from '~~/types/recorridoasientoprecio'
import { defineStore } from 'pinia'

interface State {
  deleted?: RecorridoAsientoPrecio
  mercureDeleted?: RecorridoAsientoPrecio
  isLoading: boolean
  error?: string
}

export const useRecorridoAsientoPrecioDeleteStore = defineStore(
  'recorridoasientoprecioDelete',
  {
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

      setDeleted(deleted: RecorridoAsientoPrecio) {
        this.deleted = deleted
      },

      setMercureDeleted(mercureDeleted: RecorridoAsientoPrecio | undefined) {
        this.mercureDeleted = mercureDeleted
      },

      setError(error: string) {
        this.error = error
      },
    },
  },
)
