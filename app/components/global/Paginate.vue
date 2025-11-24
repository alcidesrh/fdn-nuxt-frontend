<template>
  <Paginator v-show="collection.pagination.totalCount > 10" :rows="collection.pagination.itemsPerPage"
    :total-records="collection.pagination.totalCount" :page-link-size="3"
    :rows-per-page-options="[10, 15, 20, 30, 50, 100]" :template="{
      '640px': 'PrevPageLink NextPageLink',
      '760px': 'FirstPageLink PrevPageLink NextPageLink LastPageLink',
      '800px':
        'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown',
      'default':
        'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown ',
    }" :first="collection.pagination.page * collection.pagination.itemsPerPage
      - collection.pagination.itemsPerPage
      " @page="onChangePage" />

</template>
<script lang="ts" setup>
import type { Collection } from '~/types/collection'

interface Props {
  collection: Collection
  entity: String
}
const { collection, entity } = defineProps<Props>()
function onChangePage(e: any) {
  if (collection.pagination.itemsPerPage != e.rows) {
    collection.pagination.page = 1
    collection.pagination.itemsPerPage = e.rows
  }
  else {
    collection.pagination.page = e.page + 1
  }
  msgbus(entity).emit({ collection: 'reload' })
}
</script>
