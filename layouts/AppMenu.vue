<script setup>
import AppMenuItem from './AppMenuItem.vue';
import { useMenu } from './composables/menu';
import { useLayout } from './composables/layout';
import { ref, watch } from 'vue';
const { model, iniMenuRoots, setMenuRoots } = useMenu();
iniMenuRoots(model.length);
const open = ref(true);
watch(open, () => {
    setMenuRoots(open.value);
})

const { onMenuToggle } = useLayout();

const rotate = ref(false)

const siderbar_toggle = () => {
    onMenuToggle()
    rotate.value = !rotate.value
}

</script>
<template>
    <ul class="layout-menu">
        <li class="mt-3 mb-2 menu-option">
            <div class="flex justify-between items-center mb-3">
                <CircleDoubleLeftIcon @click="siderbar_toggle()" :class="{ 'expand w-fit rotate-180': rotate }" size="25px"
                    :strokeWidth="5" strokeLinecap="square"
                    class="text-slate-500 cursor-pointer absolute top-10px right-10px  py-4px px-6px rounded border border-slate-400 fill-slate-200 border-solid flex justify-center items-center hover:bg-slate-100" />
                <div class="flex items-center">
                    <!-- <Checkbox v-model="open" :binary="true" /> -->
                    <InputSwitch v-model="open" />
                    <label for="ingredient1" class="ml-2" v-text="open ? 'Cerrar menu' : 'Expandir menu'"> </label>
                </div>
            </div>
        </li>
        <divider type="dashed" />

        <template v-for=" (item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i" :open-root="open"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>
