import type { CreateItemData } from '~~/types/api'
import type { SubmissionErrors } from '~~/types/error'
import type { Venta } from '~~/types/venta'
import { defineStore } from 'pinia'

interface State {
  created?: Venta
  isLoading: boolean
  error?: string
  violations?: SubmissionErrors
}

export const useVentaCreateStore = defineStore('ventaCreate', {
  state: (): State => ({
    created: undefined,
    isLoading: false,
    error: undefined,
    violations: undefined,
  }),

  actions: {
    setData({ created, isLoading, error, violations }: CreateItemData<Venta>) {
      this.setCreated(created.value)
      this.setLoading(isLoading.value)
      this.setViolations(violations.value)

      if (error.value instanceof Error) {
        this.setError(error.value?.message)
      }
    },

    setCreated(created?: Venta) {
      this.created = created
    },

    setLoading(isLoading: boolean) {
      this.isLoading = isLoading
    },

    setError(error: string | undefined) {
      this.error = error
    },

    setViolations(violations: SubmissionErrors | undefined) {
      this.violations = violations
    },
  },
})
