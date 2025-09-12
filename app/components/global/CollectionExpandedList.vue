<script setup lang="ts">
interface Props {
  store: any
  field?: string
}
const { field = '_id', store } = defineProps<Props>()

const { collection, entity } = storeToRefs(store)
store.iniCollection()

const data = ref({ loading: computed(() => collection.value.loading) })

const selected = ref([])

function removeMultiple() {
  store.removeMultiple(useCloned(selected.value).cloned)
  selected.value = []
}

function rowClass(data) {
  return [{ 'row-mark': selected.value.map(i => i._id).includes(data._id as never) }]
}

onMounted(() => {
  nextTick(() => (gLoading.value = false))
})
</script>

<template>
  <div>
    <div v-if="collection.columns.length">
      <slot name="header">
        <div class="flex flex-wrap justify-between u-mb-l">
          <div>
            <span class="u-text-2 capitalize font-medium surface-contrast-600">{{ entity.name }}</span>
          </div>

          <div class="flex flex-wrap gap-5">
            <Button label="Importar" icon="pi pi-download" severity="secondary" outlined size="small" />
            <Button label="Exportar" icon="pi pi-upload" severity="secondary" outlined />

            <NuxtLink :to="{ name: entity.routes.create }">
              <Button label="Crear" icon="pi pi-plus" severity="secondary" outlined />
            </NuxtLink>
          </div>
        </div>
      </slot>

      <FormKit
        v-model="collection.vars" type="form" :actions="false" form-class="block m-auto"
        :config="{ wrapperClass: 'mb-0!' }"
      >
        <DataTable
          v-model:selection="selected" :row-class="rowClass" removable-sort
          table-style="min-width:50rem"
          :sort-order="collection.orderType == 'ASC' ? 1 : (collection.orderType == 'DESC' ? -1 : 0)"
          :value="collection.items" :filter-display="collection.hasFilter ? 'row' : undefined" scrollable
          scroll-height="700px" :class="{ opacity50: collection.loading }" @update:sort-field="(i) => store.sortCollection(i)"
        >
          <template #loading>
            ... ...buscando... ...
          </template>
          <template #empty>
            <h5 class=" m-auto my-5! text-slate-4 font-semibold w-fit">
              No hay información que mostrar
            </h5>
          </template>

          <div v-for="c, i in collection.columns" :key="i">
            <Column
              :header="c.label || c.name" :field="c.name" :show-filter-menu="false" :sortable="!!c.sort"
              align-frozen="left" :frozen="c.action" :class="c?.class"
            >
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
          <Column
            frozen align-frozen="right" :show-filter-menu="false"
            :selection-mode="collection.menu == 'selection' ? 'multiple' : 'undefined'" class="text-center action-cell"
          >
            <template #header>
              <div class="flex justify-center items-center w-full h-full ">
                <CollectionMenu :collection="collection" :selected="selected.length" @remove-multiple="removeMultiple" />
              </div>
            </template>
            <template v-if="collection.menu == 'editar'" #body="{ data }">
              <slot name="action" :data="data">
                <div class="collection-action-wrapper flex gap-4 items-center justify-center w-full relative">
                  <span class="flex items-center justify-center">
                    <NuxtLink :to="{ name: entity.routes.edit, params: { id: data[field] } }" class="absolute">
                      <Icon name="icon-park-outline:pencil" class="action edit " mode="svg" />
                    </NuxtLink>

                  </span>
                  <span class="flex items-center justify-center">
                    <Icon
                      name="icon-park-outline:delete" class="action delete absolute" mode="svg"
                      @click="store.remove(data)"
                    />
                  </span>
                </div>
              </slot>
            </template>
          </Column>
        </DataTable>
      </FormKit>
      <div v-if="collection.pagination?.totalCount" class="flex justify-center u-mb-l u-mt-s">
        <paginate :collection="collection" />
      </div>
    </div>
    <skeleton-list v-else :columns="7" />
  </div>
</template>

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
