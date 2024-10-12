<template>
  <div class="normal-case">

    <span v-if="column.name == 'createdAt'">
      <slot :name="column.name">
        {{ dformat(data[column.name]) }}
      </slot>
    </span>


    <div class="flex justify-around gap-1" v-else-if="column.name == 'roles'">
      <Chip v-for="r, i in data[column.name]" :key="i" :label="r"
        pt:root:class=" u-mr-3xs u--text-1 u-p-3xs u-px-xs lowercase" />
    </div>

    <span v-else-if="column.name == 'id'" :class="column.schema ? `highlight-${index}` : ''"
      :data-property="column.name">
      {{ data._id }}
    </span>

    <span v-else-if="column.name == 'status'">
      {{ data[column.name] }}
    </span>

    <span v-else :class="column.schema ? `highlight-${index}` : ''" :data-property="column.name">
      {{ data[column.name] }}
    </span>

  </div>
</template>
<!-- //////////////////////////////////////////////////////////////////////////////////////// -->
<!-- //////////////////////////////////////////////////////////////////////////////////////// -->
<script setup lang="ts">

const props = defineProps<{
  data: any,
  column: any,
  index: any,
}>()

</script>
