<template>
  <Paginator v-show="collection.pagination.totalCount > collection.pagination.itemsPerPage"
    :rows="collection.pagination.itemsPerPage" :totalRecords="collection.pagination.totalCount" :pageLinkSize="3"
    :rowsPerPageOptions="[10, 15, 20, 30, 50, 100]" @page="onChangePage" :template="{
      '640px': 'PrevPageLink NextPageLink',
      '960px': 'FirstPageLink PrevPageLink NextPageLink LastPageLink',
      '1300px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown',
      default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown '
    }" :first="(params.page * params.itemsPerPage) - params.itemsPerPage">

  </Paginator>
</template>
<script lang="ts" setup>
import { Collection, CollectionParameters } from '~/composables/useCollection';


const props = defineProps<{
  collection: Collection
  params: CollectionParameters
}>()

// const props = defineProps<{
//   collectionStore: CollectionStore
// }>()

function onChangePage(e: any) {
  if (props.collection.pagination.itemsPerPage != e.rows) {
    props.collection.pagination.page = 1
    props.collection.pagination.itemsPerPage = e.rows
  }
  else {
    props.collection.pagination.page = e.page + 1;
  }
  props.params.page = props.collection.pagination.page
  props.params.itemsPerPage = props.collection.pagination.itemsPerPage

}
</script>

<style></style>
