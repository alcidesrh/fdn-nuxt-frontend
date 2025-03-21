<template>
  <div v-if="!selected" class="card flex justify-center relative z-90">
    <Button type="button" text @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" class="u-p-sm">
      <Icon name="icon-park-outline:setting-config" mode="svg" aria-haspopup="true" aria-controls="overlay_menu"
        class="collection-menu-icon" />
    </Button>

    <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" class="bg-surface-contrast-1">
      <template #item="{ item }">

        <div class="flex p-3 gap-3 items-center relative cursor-pointer w-full  00">
          <Icon class="absolute" v-if="item.value == collection.menu" name="icon-park-outline:check" mode="svg"
            aria-haspopup="true" aria-controls="overlay_menu" size="20" />
          <label class="ml-30px cursor-pointer">{{ item.label }}</label>
        </div>

      </template>
    </Menu>
  </div>
  <div v-else class="card flex justify-center">
    <Button class="u-p-sm" type="button" text @click="$emit('removeMultiple')" aria-haspopup="true"
      aria-controls="overlay_menu">
      <Icon name="icon-park-outline:delete" class="text-red-400 [&>g]:stroke-3" mode="svg" />
    </Button>

  </div>
</template>

<script setup lang="ts">

const props = defineProps<{
  collection: Collection,
  selected: Number
}>()
const emit = defineEmits(['removeMultiple'])
const menu = ref();
const items = ref([

  {
    label: 'Seleccionar',
    value: 'selection',
    command: (i) => {

      props.collection.menu = 'selection'
    }
  },
  {
    label: 'Opciones',
    value: 'editar',
    command: (i) => {
      props.collection.menu = 'editar'
    }
  }

]);

const toggle = (event) => {
  menu.value.toggle(event);
};
</script>

<style scoped>
.collection-menu-icon {
  color: var(--p-surface-contrast-600)
}
</style>
