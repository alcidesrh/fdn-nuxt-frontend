import type { CreateItemData } from '~~/types/api'
import type { SubmissionErrors } from '~~/types/error'
import type { FDN } from '~~/types/fdn'
import { defineStore } from 'pinia'

interface State {
  created?: FDN
  isLoading: boolean
  error?: string
  violations?: SubmissionErrors
}

export const useFDNCreateStore = defineStore('fdnCreate', {
  state: (): State => ({
    created: undefined,
    isLoading: false,
    error: undefined,
    violations: undefined,
  }),

  actions: {
    setData({ created, isLoading, error, violations }: CreateItemData<FDN>) {
      this.setCreated(created.value)
      this.setLoading(isLoading.value)
      this.setViolations(violations.value)

      if (error.value instanceof Error) {
        this.setError(error.value?.message)
      }
    },

    setCreated(created?: FDN) {
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
