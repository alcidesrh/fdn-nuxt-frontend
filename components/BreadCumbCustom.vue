<script setup>
const { breadcrumb } = useBreadcrumb();
const route = useRoute()

</script>

<template>
  <div class=" flex justify-center ">

    <Breadcrumb :model="breadcrumb">
      <template #item="{ item, props }">
        <NuxtLink v-if="item.route" :to="{ name: item.route, params: item.params }">
          <div class="flex gap-x-2 items-center  py-3 px-1 rounded">
            <div v-if="item.icon">
              <Icon :name="item.icon" class="surface-contrast-600 cursor-pointer  u-text-0!" mode="svg" />
            </div>
            <span class="surface-contrast-600 font-medium  capitalize">{{ item?.label || item.route }}</span>
          </div>
        </NuxtLink>
      </template>
      <template #separator>
        <Icon name="icon-park-outline:right" class="surface-contrast-500 cursor-pointer  u-text-1!" mode="svg" />
      </template>
    </Breadcrumb>
  </div>
</template>
