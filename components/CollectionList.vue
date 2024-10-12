<template>
  <div v-if="columns?.length">

    <slot name="header"></slot>

    <FormKit type="form" :actions="false" v-model="params" form-class="block m-auto" :config="{
      inputClass: 'text-14px',
    }">

      <DataTable stripedRows @update:sortField="sort || false" removableSort tableStyle="min-width:50rem"
        :sortOrder="params.orderType == 'ASC' ? 1 : (params.orderType == 'DESC' ? -1 : 0)" :value="collection.items"
        :class="{ 'opacity-50': data.loading || loading }" filterDisplay="row" scrollable>
        <template #loading>... ...buscando... ...</template>
        <template #empty>
          <h5 class=" m-auto my-5! text-slate-4 font-semibold w-fit">No hay información que mostrar</h5>
        </template>


        <template v-for="c, i in columns" :key="i">

          <Column :header="c.label || c.name" :field="c.name" :showFilterMenu="false" :sortable="!!c.sort"
            alignFrozen="left" :frozen="c.action" :class="[columnClass(c)]">

            <template v-if="c.schema" #filter>
              <FormKitSchema :schema="c.schema" :data="data" />
            </template>

            <template #body="{ data }">
              <collection-cell v-if="!c.action" :data="data" :column="c" :index="i" />
              <slot name="action" :id="data.id" :_id="data._id" v-else>

                <div class="flex gap-5 items-center justify-center w-full">
                  <Icon name="icon-park-outline:delete"
                    class="[&>g>path]:stroke-2px  text-orange-500 cursor-pointer u-text-1! action" mode="svg" />
                  <NuxtLink :to="{ name: 'users-editar' }">
                    <Icon name="icon-park-outline:pencil" class=" primary-contrast-500 cursor-pointer  u-text-1! action"
                      mode="svg" />
                  </NuxtLink>
                </div>

              </slot>
            </template>

            <template v-if="field !== 'price'">
              <InputText v-model="data[field]" autofocus fluid />
            </template>
            <template v-else>
              <InputNumber v-model="data[field]" mode="currency" currency="USD" locale="en-US" autofocus fluid />
            </template>
          </Column>
        </template>
      </DataTable>
    </FormKit>
    <div class="flex justify-center u-mb-l u-mt-s">
      <paginate :collection="collectionStore.collection" :params="collectionStore.params" />
    </div>
  </div>
  <skeleton-list v-else :columns="7" />
</template>
<!-- //////////////////////////////////////////////////////////////////////////////////////// -->
<!-- //////////////////////////////////////////////////////////////////////////////////////// -->
<script setup lang="ts">
import type { CollectionStore, Column } from '~/composables/useCollection';

const { columnClass } = useCollection()

const emit = defineEmits(['sort'])

const props = defineProps<{
  collectionStore: CollectionStore,
  loading: boolean
}>()

const collection = props.collectionStore.collection
const params = props.collectionStore.params
const columns = computed(() => props.collectionStore.columns)

let data = ref({ loading: false })

watch(() => props.collectionStore.data.loading, (v) => {
  data.value.loading = v
})

onUnmounted(() => {
  CSS.highlights.clear()
})

function sort(i: string) {
  emit('sort', i)
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
