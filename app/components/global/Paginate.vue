<script lang="ts" setup>
import type { Collection } from '~/types/collection'

interface Props {
  collection: Collection
}
const { collection } = defineProps<Props>()

function onChangePage(e: any) {
  if (collection.vars.itemsPerPage != e.rows) {
    collection.vars.page = 1
    collection.vars.itemsPerPage = e.rows
  }
  else {
    collection.vars.page = e.page + 1
  }
}
</script>

<template>
  <Paginator
    v-show="collection.pagination.totalCount > collection.vars.itemsPerPage"
    :rows="collection.vars.itemsPerPage"
    :total-records="collection.pagination.totalCount"
    :page-link-size="3"
    :rows-per-page-options="[10, 15, 20, 30, 50, 100]"
    :template="{
      '640px': 'PrevPageLink NextPageLink',
      '760px': 'FirstPageLink PrevPageLink NextPageLink LastPageLink',
      '800px':
        'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown',
      'default':
        'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown ',
    }"
    :first="
      collection.vars.page * collection.vars.itemsPerPage
        - collection.vars.itemsPerPage
    "
    @page="onChangePage"
  />
</template>

<style></style>
