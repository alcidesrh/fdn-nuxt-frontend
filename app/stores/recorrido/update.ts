import type { FetchItemData, UpdateItemData } from '~~/types/api'
import type { SubmissionErrors } from '~~/types/error'
import type { Recorrido } from '~~/types/recorrido'
import { defineStore } from 'pinia'

interface State {
  updated?: Recorrido
  retrieved?: Recorrido
  isLoading: boolean
  error?: string
  hubUrl?: URL
  violations?: SubmissionErrors
}

export const useRecorridoUpdateStore = defineStore('recorridoUpdate', {
  state: (): State => ({
    updated: undefined,
    retrieved: undefined,
    isLoading: false,
    error: undefined,
    hubUrl: undefined,
    violations: undefined,
  }),

  actions: {
    setData({ retrieved, isLoading, error, hubUrl }: FetchItemData<Recorrido>) {
      this.setRetrieved(retrieved.value)
      this.setLoading(isLoading.value)
      this.setHubUrl(hubUrl.value)

      if (error.value instanceof Error) {
        this.setError(error.value?.message)
      }
    },

    setUpdateData({
      updated,
      isLoading,
      error,
      violations,
    }: UpdateItemData<Recorrido>) {
      this.setUpdated(updated.value)
      this.setLoading(isLoading.value)
      this.setViolations(violations.value)

      if (error.value instanceof Error) {
        this.setError(error.value?.message)
      }
    },

    setRetrieved(retrieved?: Recorrido) {
      this.retrieved = retrieved
    },

    setUpdated(updated?: Recorrido) {
      this.updated = updated
    },

    setHubUrl(hubUrl?: URL) {
      this.hubUrl = hubUrl
    },

    setLoading(isLoading: boolean) {
      this.isLoading = isLoading
    },

    setError(error?: string) {
      this.error = error
    },

    setViolations(violations?: SubmissionErrors) {
      this.violations = violations
    },
  },
})
