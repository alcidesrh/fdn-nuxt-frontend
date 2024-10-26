<script setup lang="ts">
const props = defineProps<{
  collection: Collection,
}>()
const { columnClass } = useCollection()
const emit = defineEmits(['sort'])
const collection = props.collection
let data = ref({ loading: false })

watch(() => collection.loading, (v) => {
  data.value.loading = v
})
const selected = ref()
</script>
<template>
  <div v-if="collection.columns.length">
    <slot name="header">
      <div class="flex flex-wrap justify-between u-mb-l">
        <div>
          <span class="u-text-2 capitalize font-medium surface-contrast-600">{{ collection.label }}</span>
        </div>

        <div class="flex flex-wrap gap-5">
          <Button label="Importar" icon="pi pi-download" severity="secondary" outlined />
          <Button label="Exportar" icon="pi pi-upload" severity="secondary" outlined />
          <Button label="Nuevo" icon="pi pi-plus" outlined />
          <Button label="Eliminar" icon="pi pi-trash" severity="danger" outlined />
        </div>
      </div>
    </slot>

    <FormKit type="form" :actions="false" v-model="collection.vars" form-class="block m-auto" :config="{
      inputClass: 'text-14px',
      outerClass: 'mb-0!',
      wrapperClass: 'mb-0!'
    }">

      <DataTable stripedRows @update:sortField="(i) => $emit('sort', i)" removableSort tableStyle="min-width:50rem"
        :sortOrder="collection.orderType == 'ASC' ? 1 : (collection.orderType == 'DESC' ? -1 : 0)"
        :value="collection.items" :class="{ 'opacity-50': collection.loading }" filterDisplay="row" scrollable
        v-model:selection="selected">
        <template #loading>... ...buscando... ...</template>
        <template #empty>
          <h5 class=" m-auto my-5! text-slate-4 font-semibold w-fit">No hay información que mostrar</h5>
        </template>

        <Column frozen :showFilterMenu="false" :selectionMode="collection.menu == 'selection' ? 'multiple' : undefined"
          class="text-center">
          <template #header>
            <div class="flex justify-center items-center w-full h-full">
              <CollectionMenu :collection="collection" />
            </div>
          </template>
          <template v-if="collection.menu == 'editar'" #body="{ data }">
            <slot name="action" :data="data">
            </slot>
          </template>
        </Column>
        <template v-for="c, i in collection.columns" :key="i">

          <Column :header="c.label || c.name" :field="c.name" :showFilterMenu="false" :sortable="!!c.sort"
            alignFrozen="left" :frozen="c.action" :class="[columnClass(c)]">


            <template v-if="c.schema" #filter>
              <FormKitSchema :schema="c.schema" :data="data" />
            </template>

            <template #body="{ data }">
              <collection-cell v-if="!c.action" :data="data" :column="c" :index="i" />
            </template>

          </Column>
        </template>
      </DataTable>
    </FormKit>
    <div class="flex justify-center u-mb-l u-mt-s" v-if="collection.pagination?.totalCount">
      <paginate :collection="collection" />
    </div>
  </div>
  <skeleton-list v-else :columns="7" />

</template>
<!-- //////////////////////////////////////////////////////////////////////////////////////// -->
<!-- //////////////////////////////////////////////////////////////////////////////////////// -->


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
