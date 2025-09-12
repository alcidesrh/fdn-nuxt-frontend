import type { CreateItemData } from '~~/types/api'
import type { SubmissionErrors } from '~~/types/error'
import type { Parada } from '~~/types/parada'
import { defineStore } from 'pinia'

interface State {
  created?: Parada
  isLoading: boolean
  error?: string
  violations?: SubmissionErrors
}

export const useParadaCreateStore = defineStore('paradaCreate', {
  state: (): State => ({
    created: undefined,
    isLoading: false,
    error: undefined,
    violations: undefined,
  }),

  actions: {
    setData({ created, isLoading, error, violations }: CreateItemData<Parada>) {
      this.setCreated(created.value)
      this.setLoading(isLoading.value)
      this.setViolations(violations.value)

      if (error.value instanceof Error) {
        this.setError(error.value?.message)
      }
    },

    setCreated(created?: Parada) {
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
