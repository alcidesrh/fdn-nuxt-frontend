<template>
  <Paginator :rows="collection.pagination.itemsPerPage" :totalRecords="collection.pagination.totalCount"
    :pageLinkSize="3" :rowsPerPageOptions="[10, 15, 20, 30, 50, 100]" @page="onChangePage" :template="{
      '640px': 'PrevPageLink NextPageLink',
      '960px': 'FirstPageLink PrevPageLink NextPageLink LastPageLink',
      '1300px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown',
      default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown '
    }" :first="(params.page * params.itemsPerPage) - params.itemsPerPage">

  </Paginator>
</template>

<script lang="ts" setup>
const { collection, params } = useCollection()

function onChangePage(e: any) {
  if (collection.pagination.itemsPerPage != e.rows) {
    collection.pagination.page = 1
    collection.pagination.itemsPerPage = e.rows
  }
  else {
    collection.pagination.page = e.page + 1;
  }
  params.value.page = collection.pagination.page
  params.value.itemsPerPage = collection.pagination.itemsPerPage

}
</script>

<style></style>
