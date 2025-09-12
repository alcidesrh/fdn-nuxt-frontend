<script setup lang="ts">
const props = defineProps<{
  data: any
  column: any
  index: any
}>()
</script>

<!-- //////////////////////////////////////////////////////////////////////////////////////// -->
<!-- //////////////////////////////////////////////////////////////////////////////////////// -->
<template>
  <div class="collection-cell-wrap">
    <div v-if="column.name == 'createdAt'">
      {{ dformat(data[column.name]) }}
    </div>
    <span
      v-else-if="column.name == 'id'" :class="column.schema ? `highlight-${index}` : ''"
      :data-property="column.name"
    >
      {{ data._id }}
    </span>

    <span v-else-if="data[column.name]?.id">
      <Chip class="u-m-3xs u-py-2xs" :label="data[column.name]?.nombre" />
    </span>

    <span v-else-if="column.name == 'status'" class="capitalize">
      {{ data[column.name] }}
    </span>
    <div v-else-if="Array.isArray(data[column.name]?.collection)" class="flex flex-wrap gap-1">
      <Chip
        v-for="v in data[column.name].collection" :key="v.id"
        pt:root:class=" u-mr-3xs u--text-1 u-p-3xs u-px-xs lowercase" :label="v.nombre"
      />
    </div>
    <span v-else :class="column.schema ? `highlight-${index}` : ''" :data-property="column.name">
      {{ data[column.name] }}
    </span>
  </div>
</template>
