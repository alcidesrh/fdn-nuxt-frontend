<template>
  <CrudForm :store="store" :arg="{ username: $route.params.username }">
    <template #left-header>
      <div class="flex justify-between">
        <div class="grid gap-5">
          <div class="u-text-2 font-semibold ">{{ item?.id ? 'Editar' : 'Crear' }} usuario</div>
          <div v-show="item?.updatedAt" class="grid gap-3 items-center ">
            <div class="flex items-center gap-1">
              <span class="font-medium">ID:</span>
              <span class="u-text-1 font-medium ml-2">{{ `${item?._id}` }} </span>
            </div>
            <div class="grip  items-center">

              <span class="flex gap-1">
                <icon name="icon-park-outline:calendar" size="18" mode="svg" />
                <span class="font-medium">Creado:</span> {{ dformat(item?.createdAt) }}
              </span>
              <divider layout="vertical" />
              <span class="flex gap-1">
                <icon name="icon-park-outline:calendar" size="18" mode="svg" />
                <span class="font-medium">Actualizado:</span> {{ dformat(item?.updatedAt) }}
              </span>
            </div>
          </div>
        </div>
      </div>

    </template>
    <template #right-header>
    </template>
  </CrudForm>
</template>

<script setup lang="ts">

const store = useUserStore()

const { item } = storeToRefs(store)


</script>
