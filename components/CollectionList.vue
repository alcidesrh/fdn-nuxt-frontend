<template>
  <div v-if="columns?.length">
    <DataTable @update:sortField="sort"
      :sortOrder="params.orderType == 'ASC' ? 1 : (params.orderType == 'DESC' ? -1 : 0)" :value="collection.items"
      :class="{ 'opacity-50': loading }" filterDisplay="row" :globalFilterFields="['username', 'status', 'nombre']">
      <template #empty>
        <h5 class="m-auto my-5! text-slate-4 font-semibold w-fit">No hay información que mostrar</h5>
      </template>
      <template v-for="c, i in columns" :key="i">
        <Column :field="c.field" :header="c?.label || c.field" :sortable="!!c.sort" class="capitalize">
          <template #body="{ data }">
            <slot name="cell" :column="c" :value="data[c.field]" />
          </template>
          <template v-if="['username', 'fullName', 'status', '_id', 'createdAt'].includes(c.field)"
            #filter="{ filterModel, filterCallback }">
            <InputText type="text" placeholder="Search by name" />
          </template>
        </Column>
      </template>

    </DataTable>
    <div class="flex justify-center u-mb-l u-mt-s">
      <paginate />
    </div>
  </div>
  <skeleton-list v-else :columns="7" />
</template>

<script lang="ts" setup>
import { FilterMatchMode, FilterOperator } from '@primevue/core/api';
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  'country.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  representative: { value: null, matchMode: FilterMatchMode.IN },
  status: { value: null, matchMode: FilterMatchMode.EQUALS },
  verified: { value: null, matchMode: FilterMatchMode.EQUALS }
});
defineProps({
  loading: Boolean
})

const { collection, params, columns } = useCollection()


const sort = (d: string) => {

  const col = columns.value.find(i => i.field == d)
  if (typeof col != 'undefined') {
    d = col.sortfield || col.field
  }
  if (params.value.orderField == d) {
    if (params.value.orderType == 'ASC') {
      params.value.orderType = 'DESC'
    }
    else if (params.value.orderType == 'DESC') {
      params.value.orderField = ''
      params.value.orderType = ''
    }
  }
  else if (d) {
    params.value.page = 1
    collection.pagination.page = 1
    params.value.orderField = d
    params.value.orderType = 'ASC'
  }
  else {
    params.value.orderField = ''
    params.value.orderType = ''
  }
  // console.log(params.order, params.orderField, params.orderType)
}

</script>
