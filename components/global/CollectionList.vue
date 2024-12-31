<template>
  <div>
    <div v-if="collection.columns.length">
      <slot name="header">
        <div class="flex flex-wrap justify-between">
          <div>
            <span class="u-text-2 capitalize font-medium surface-contrast-600">Listado</span>
          </div>

          <div class="flex flex-wrap gap-5">
            <Button label="Importar" icon="pi pi-download" severity="secondary" outlined />
            <Button label="Exportar" icon="pi pi-upload" severity="secondary" outlined />
          </div>
        </div>
      </slot>
      <FormKit type="form" :actions="false" v-model="collection.vars" form-class="block m-auto" :config="{
        outerClass: 'mb-0!',
        wrapperClass: 'mb-0!'
      }">

        <DataTable :rowClass="rowClass" @update:sortField="(i) => $emit('sort', i)" removableSort
          tableStyle="min-width:50rem"
          :sortOrder="collection.orderType == 'ASC' ? 1 : (collection.orderType == 'DESC' ? -1 : 0)"
          :value="collection.items" :class="{ 'opacity-50': collection.loading }" filterDisplay="row" scrollable
          v-model:selection="selected" scrollHeight="700px">
          <template #loading>... ...buscando... ...</template>
          <template #empty>
            <h5 class=" m-auto my-5! text-slate-4 font-semibold w-fit">No hay información que mostrar</h5>
          </template>

          <template v-for="c, i in collection.columns" :key="i">
            <Column :header="c.label || c.name" :field="c.name" :showFilterMenu="false" :sortable="!!c.sort"
              alignFrozen="left" :frozen="c.action" :class="[collection.columnClass(c)]">
              <template v-if="c.schema" #filter>
                <FormKitSchema :schema="c.schema" :data="data" />
              </template>
              <template #body="{ data }">
                <collection-cell v-if="!c.action" :data="data" :column="c" :index="i" />
              </template>
            </Column>
          </template>
          <Column frozen alignFrozen="right" :showFilterMenu="false"
            :selectionMode="collection.menu == 'selection' ? 'multiple' : undefined"
            class="text-center w-100px action-cell">
            <template #header>
              <div class="flex justify-center items-center w-full h-full">
                <CollectionMenu :collection="collection" :selected="selected.length" @removeMultiple="removeMultiple" />
              </div>
            </template>
            <template v-if="collection.menu == 'editar'" #body="{ data }">
              <slot name="action" :data="data">
              </slot>
            </template>
          </Column>
        </DataTable>
      </FormKit>
      <div class="flex justify-center u-mb-l u-mt-s" v-if="collection.pagination?.totalCount">
        <paginate :collection="collection" />
      </div>
    </div>
    <skeleton-list v-else :columns="7" />
  </div>

</template>
<script setup lang="ts">
const props = defineProps<{
  collection: Collection,
  deleted: boolean
}>()
const emit = defineEmits(['sort', 'removeMultiple'])
const collection = props.collection
let data = ref({ loading: false })

watch(() => collection.loading, (v) => {
  data.value.loading = v
})
const selected = ref([])
watch(() => props.deleted, (v) => {
  selected.value = []
})
watch(() => selected.value, (v) => {

})

function removeMultiple() {
  emit('removeMultiple', useCloned(selected.value).cloned)
}

const rowClass = (data) => {
  return [{ 'row-mark': selected.value.map(i => i['_id']).includes(data['_id'] as never) }];
};
</script>
<style scoped>
::highlight(highlight-0),
::highlight(highlight-1),
::highlight(highlight-2),
::highlight(highlight-3),
::highlight(highlight-4),
::highlight(highlight-5),
::highlight(highlight-6),
::highlight(highlight-7) {
  background-color: #fde047;
  color: black;
}

.action {
  transition: all .2s;

  &:hover {
    scale: 2;
    background-color: var(--p-primary-contrast-700);
    border-radius: 999px;
    color: var(--p-primary-contrast-100);
    padding: 3px;
  }
}
</style>
