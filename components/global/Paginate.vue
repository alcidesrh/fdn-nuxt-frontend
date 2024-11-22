<template>

  <Paginator v-show="collection.pagination.totalCount > collection.vars.itemsPerPage"
    :rows="collection.vars.itemsPerPage" :totalRecords="collection.pagination.totalCount" :pageLinkSize="3"
    :rowsPerPageOptions="[10, 15, 20, 30, 50, 100]" @page="onChangePage" :template="{
      '640px': 'PrevPageLink NextPageLink',
      '960px': 'FirstPageLink PrevPageLink NextPageLink LastPageLink',
      '1300px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown',
      default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown '
    }" :first="(collection.vars.page * collection.vars.itemsPerPage) - collection.vars.itemsPerPage">

  </Paginator>
</template>
<script lang="ts" setup>
import { Collection } from '~/composables/useCollection';


const props = defineProps<{
  collection: Collection
}>()

function onChangePage(e: any) {
  if (props.collection.vars.itemsPerPage != e.rows) {
    props.collection.vars.page = 1
    props.collection.vars.itemsPerPage = e.rows
  }
  else {
    props.collection.vars.page = e.page + 1;
  }
}
</script>

<style></style>
