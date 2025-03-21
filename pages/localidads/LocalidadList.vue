<template>
  <div>
    <collection-list :store="store" :collection="collection" @sort="store.sort" @removeMultiple="store.removeMultiple">
      <template #header>

      </template>
      <template #action="{ data }">
        <div class="collection-action-wrapper flex gap-3 items-center justify-center w-full relative">
          <span class="flex items-center justify-center">
            <NuxtLink :to="{ name: metadata.routes.edit, params: { id: data._id } }" class="absolute">
              <Icon name="icon-park-outline:pencil" class="action edit " mode="svg" />
            </NuxtLink>
          </span>
          <span class="flex items-center justify-center">
            <Icon name="icon-park-outline:delete" class="action delete absolute" mode="svg"
              @click="store.remove(data)" />
          </span>
        </div>
      </template>
    </collection-list>
  </div>
</template>
<script setup lang="ts">

const store = useLocalidadStore()

const { metadata, collection } = store

collection.iniCollection()

</script>
