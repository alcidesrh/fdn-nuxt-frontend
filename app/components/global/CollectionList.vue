<template>
  <div>
    <div v-if="entity.collection.columns.length" class="relative ">
      <slot name="header">
        <div class="flex flex-wrap justify-between u-mb-s ">
          <span class=" capitalize u-text-3">{{ entity.name }}</span>

          <div class="flex flex-wrap gap-5">
            <Button label="Importar" icon="pi pi-download" severity="secondary" outlined size="small" />
            <Button label="Exportar" icon="pi pi-upload" severity="secondary" outlined />

            <NuxtLink :to="{ name: entity.endpoints.create }">
              <Button label="Crear" icon="pi pi-plus" severity="secondary" outlined />
            </NuxtLink>
          </div>
        </div>
      </slot>

      <FormKit v-model="entity.collection.filters" type="form" :actions="false" form-class="block m-auto"
        :config="{ wrapperClass: 'mb-0!' }">
        <DataTable stripedRows v-model:selection="selected" :r ow-class="rowClass" removable-sort
          table-style="min-width:50rem"
          :sort-order="entity.collection.orderType == 'ASC' ? 1 : entity.collection.orderType == 'DESC' ? -1 : 0"
          :value="entity.collection.items" :filter-display="entity.collection.hasFilter ? 'row' : undefined" scrollable
          scroll-height="700px" @update:sort-field="(i) => store.sortCollection(i)" :class="{ 'opacity-50': cloading }">
          <template #loading>
            ... ...buscando... ...
          </template>
          <template #empty>
            <h5 class="m-auto w-fit text-slate-4 font-semibold my-5!">
              No hay información que mostrar
            </h5>
          </template>
          <!-- <div v-show="cloading" class="collection-loader"></div> -->

          <div v-for="(c, i) in entity.collection.columns" :key="i">
            <Column :header="c.label || c.name" :field="c.name" :show-filter-menu="false" :sortable="!!c.sort"
              align-frozen="left" :frozen="c.action" :class="c?.class">
              <template #filter>
                <FormKitSchema v-if="c.schema" :schema="c.schema" :data="data" />
              </template>
              <template #body="{ data }">
                <slot :name="c.name" :data="data[c.name]">
                  <collection-cell v-if="!c.action" :data="data" :column="c" :index="i" />
                </slot>
              </template>
            </Column>
          </div>
          <Column frozen align-frozen="right" :show-filter-menu="false"
            :selection-mode="entity.collection.menu == 'selection' ? 'multiple' : undefined"
            class="action-cell text-center">
            <template #header>
              <!-- <div class="h-full w-full flex items-center justify-center"> -->
              <CollectionMenu :collection="entity.collection" :selected="selected.length"
                @remove-multiple="removeMultiple" />
              <!-- </div> -->
            </template>
            <template v-if="entity.collection.menu == 'editar'" #body="{ data }">
              <slot name="action" :data="data">
                <div class="collection-action-wrapper relative w-full flex items-center justify-center gap-4">
                  <span class="flex items-center justify-center">
                    <NuxtLink :to="{ name: entity.endpoints.edit, params: { id: data[field || '_id'] } }"
                      class="absolute">
                      <Icon name="stylus" class="action edit" />
                    </NuxtLink>
                  </span>
                  <span class="flex items-center justify-center">
                    <Icon name="delete" class="action delete absolute" @click="store.remove(data)" />
                  </span>
                </div>
              </slot>
            </template>
          </Column>
        </DataTable>
      </FormKit>
      <div v-if="entity.collection.pagination?.totalCount" class="flex justify-center u-mb-l u-mt-s">
        <paginate :collection="entity.collection" :entity="entity.name" />
      </div>
    </div>
    <skeleton-list v-else :columns="7" />
  </div>
</template>

<script setup lang="ts">
interface Props {
  store: any
  field?: string
}
const { field = '_id', store } = defineProps<Props>()

const { entity } = storeToRefs(store)
const filters = ref({})
store.iniCollection().then(() => {

  store.getCollection().then(() => {


  })

})
const data = ref({})

const selected = ref([])

function removeMultiple() {
  store.removeMultiple(useCloned(selected.value).cloned)
  selected.value = []
}

function rowClass(data) {
  return [{ 'row-mark': selected.value.map(i => i._id).includes(data._id as never) }]
}
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
</style>
