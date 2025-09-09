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

      <FormKit type="form" :actions="false" v-model="collection.vars" form-class="block m-auto"
        :config="{ wrapperClass: 'mb-0!' }">

        <DataTable :rowClass="rowClass" @update:sortField="(i) => store.sortCollection(i)" removableSort
          tableStyle="min-width:50rem"
          :sortOrder="collection.orderType == 'ASC' ? 1 : (collection.orderType == 'DESC' ? -1 : 0)"
          :value="collection.items" :filterDisplay="collection.hasFilter ? 'row' : undefined" scrollable
          v-model:selection="selected" scrollHeight="700px" :class='{ opacity50: collection.loading }'>
          <template #loading>... ...buscando... ...</template>
          <template #empty>
            <h5 class=" m-auto my-5! text-slate-4 font-semibold w-fit">No hay información que mostrar</h5>
          </template>

          <div v-for="c, i in collection.columns" :key="i">
            <Column :header="c.label || c.name" :field="c.name" :showFilterMenu="false" :sortable="!!c.sort"
              alignFrozen="left" :frozen="c.action" :class="c?.class">
              <template #filter>
                <FormKitSchema :schema="c.schema" :data="data" v-if="c.schema" />
              </template>
              <template #body="{ data }">
                <slot :name="c.name" :data="data[c.name]">
                  <collection-cell v-if="!c.action" :data="data" :column="c" :index="i" />
                </slot>
              </template>
            </Column>
          </div>
          <Column frozen alignFrozen="right" :showFilterMenu="false"
            :selectionMode="collection.menu == 'selection' ? 'multiple' : 'undefined'" class="text-center action-cell">
            <template #header>
              <div class="flex justify-center items-center w-full h-full ">
                <CollectionMenu :collection="collection" :selected="selected.length" @removeMultiple="removeMultiple" />
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
                    <Icon name="icon-park-outline:delete" class="action delete absolute" mode="svg"
                      @click="store.remove(data)" />
                  </span>
                </div>
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

interface Props {
  store: any;
  field?: string;
}
const { field = '_id', store } = defineProps<Props>()

const { collection, entity } = storeToRefs(store)
store.iniCollection()

let data = ref({ loading: computed(() => collection.value.loading) })

const selected = ref([])


function removeMultiple() {
  store.removeMultiple(useCloned(selected.value).cloned)
  selected.value = []
}

const rowClass = (data) => {
  return [{ 'row-mark': selected.value.map(i => i['_id']).includes(data['_id'] as never) }];
};

onMounted(() => {
  nextTick(() => (gLoading.value = false));
})
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
