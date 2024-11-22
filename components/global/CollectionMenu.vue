<template>
  <div class="card flex justify-center">
    <Button type="button" text @click="toggle" aria-haspopup="true" aria-controls="overlay_menu">
      <Icon name="icon-park-outline:setting-config" mode="svg" aria-haspopup="true" aria-controls="overlay_menu" />
    </Button>

    <Menu ref="menu" id="overlay_menu" :model="items" :popup="true">
      <template #item="{ item }">

        <div class="flex p-3 gap-3 items-center relative cursor-pointer w-full">
          <Icon class="absolute" v-if="item.value == props.collection.menu" name="icon-park-outline:check" mode="svg"
            aria-haspopup="true" aria-controls="overlay_menu" />
          <label class="ml-35px cursor-pointer">{{ item.label }}</label>
        </div>

      </template>
    </Menu>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  collection: Collection,
}>()

const menu = ref();
const items = ref([
  {
    // label: 'Options',
    items: [
      {
        label: 'Seleccionar',
        value: 'selection',
        command: (i) => {

          props.collection.menu = 'selection'
        }
      },
      {
        label: 'Modificar',
        value: 'editar',
        command: (i) => {
          props.collection.menu = 'editar'
        }
      }
    ]
  }
]);

const toggle = (event) => {
  menu.value.toggle(event);
};
</script>
