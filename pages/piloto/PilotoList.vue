<template>
  <div>
    <collection-list :collection="collection" @sort="collectionStore.sort">

      <template #action="{ _id, id }">
        <div class="flex gap-5 items-center justify-center w-full">
          <Icon name="icon-park-outline:delete"
            class="[&>g>path]:stroke-2px  text-orange-500 cursor-pointer u-text-1! action" mode="svg" />
          <Icon @click="edit" name="icon-park-outline:pencil"
            class=" primary-contrast-500 cursor-pointer  u-text-1! action" mode="svg" />
        </div>
      </template>
    </collection-list>
  </div>

</template>
<!-- //////////////////////////////////////////////////////////////////////////////////////// -->
<!-- //////////////////////////////////////////////////////////////////////////////////////// -->
<script setup lang="ts">

definePageMeta({
  name: 'piloto-collection',
  path: '/listado/piloto'
})

const router = useRouter()
const edit = (_id, id) => {
  router.push({ name: `usuario_collection` }); return;
}

const collectionStore = usePilotoCollectionStore()

collectionStore.ini()

const { collection } = storeToRefs(collectionStore)

</script>
<style scope>
.action {
  transition: scale .2s;

  &:hover {
    scale: 1.5;
    background-color: var(--p-primary-contrast-100);
    /* border: 1px solid var(--p-primary-contrast-400); */
    border-radius: 999px;
    color: var(--p-primary-contrast-800);
    padding: 3px;
  }
}
</style>
