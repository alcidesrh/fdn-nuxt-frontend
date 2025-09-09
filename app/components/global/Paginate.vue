<script lang="ts" setup>
import type { Collection } from "~/types/collection";

interface Props {
    collection: Collection;
}
const { collection } = defineProps<Props>();

function onChangePage(e: any) {
    if (collection.vars.itemsPerPage != e.rows) {
        collection.vars.page = 1;
        collection.vars.itemsPerPage = e.rows;
    } else {
        collection.vars.page = e.page + 1;
    }
}
</script>

<style></style>
<template>
    <Paginator
        v-show="collection.pagination.totalCount > collection.vars.itemsPerPage"
        :rows="collection.vars.itemsPerPage"
        :totalRecords="collection.pagination.totalCount"
        :pageLinkSize="3"
        :rowsPerPageOptions="[10, 15, 20, 30, 50, 100]"
        @page="onChangePage"
        :template="{
            '640px': 'PrevPageLink NextPageLink',
            '760px': 'FirstPageLink PrevPageLink NextPageLink LastPageLink',
            '800px':
                'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown',
            default:
                'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown ',
        }"
        :first="
            collection.vars.page * collection.vars.itemsPerPage -
            collection.vars.itemsPerPage
        "
    >
    </Paginator>
</template>
