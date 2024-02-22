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
        <li class="mt-6 mb-0 menu-option">
            <div class="flex justify-between items-center mb-5">
                <CircleDoubleLeftIcon @click="siderbar_toggle()" :class="{ 'expand w-fit rotate-180': rotate }" size="15px"
                    :strokeWidth="5" strokeLinecap="square"
                    class="text-slate-400 cursor-pointer  top-10px right-10px  py-3px px-4px rounded border border-slate-400 fill-slate-200 border-solid flex justify-center items-center hover:bg-slate-100" />
                <div class="flex items-center">
                    <!-- <label for="ingredient1" class="mr-2 font-bold text-slate-5 text-10px"
                        v-text="open ? 'Cerrar menu' : 'Expandir menu'"> </label> -->
                    <InputSwitch v-tooltip.top="open ? 'Cerrar menu' : 'Expandir menu'" v-model="open" />

                </div>
            </div>
        </li>

        <template v-for=" (item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i" :open-root="open"></app-menu-item>
        </template>
    </ul>
</template>
