<template>
    <div :class="[firstLoad ? 'hidden' : 'block', hiddenLocal ? 'hide-animation ' : 'show-animation']"
        class="config-panel  absolute top-[3.25rem] right-0 w-64 p-4 bg-surface-contrast-100 dark:bg-surface-900 border border-surface-contrast-300 origin-top hidden-transition">

        <i class="pi pi-times absolute right-0 top-0 m-3 cursor-pointer surface-contrast-600"
            @click="hiddenLocal = true" />
        <div class="flex flex-col gap-4">
            <div>
                <div class="text-sm  font-semibold mb-2">Color de Botones</div>
                <div class="pt-2 flex gap-2 flex-wrap justify-between items-center u-mt-3xs">
                    <div v-for="primaryColor of colorPalette" :key="primaryColor.name" class="rounded-full">
                        <button type="button" :title="primaryColor.name"
                            class="border-none w-5 h-5 rounded-full p-0 cursor-pointer outline-none outline-offset-1"
                            :class="{ 'outline-primary': ui.color === primaryColor.name }"
                            @click="ui.updateColors('primary', primaryColor.name)"
                            :style="{ backgroundColor: `${primaryColor.name === 'noir' ? 'var(--text-color)' : primaryColor.palette['500']}` }"></button>
                    </div>
                </div>
            </div>
            <div class=" u-my-xs">
                <div class="text-sm text-muted-color font-semibold mb-2">Color de Fondo</div>
                <div class="pt-2 flex gap-2 flex-wrap justify-between u-mt-3xs">
                    <button v-for="surface of surfaces" :key="surface.name" type="button" :title="surface.name"
                        @click="ui.updateColors('surface', surface.name)" :class="[
                            'border-none w-5 h-5 rounded-full p-0 cursor-pointer outline-none outline-offset-1',
                            { 'outline-primary': ui.surface ? ui.surface === surface.name : ui.darkTheme ? surface.name === 'zinc' : surface.name === 'slate' }
                        ]" :style="{ backgroundColor: `${surface.palette['500']}` }"></button>
                </div>
            </div>
            <!-- <div class="flex flex-col gap-2">
                <div class="text-sm text-muted-color font-semibold">Estilo</div>
                <SelectButton v-model="ui.preset" @change="ui.setPreset()" :options="presetOptions"
                    :allowEmpty="false" />
            </div> -->


            <div class="relative flex justify-between mt-3 mb-1">
                <Button size="small" label="Reiniciar" @click="ui.reset();" />
                <Button size="small" label="Aceptar" outlined @click="hiddenLocal = true" />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
// import Aura from '@primevue/themes/aura';
// import Lara from '@primevue/themes/lara';
import { ref } from 'vue';
import { colorPalette } from '~/plugins/primevue/presetSlate'

const props = defineProps<{
    hidden: boolean
}>()

const hiddenLocal = ref(true)

watch(() => props.hidden, (v) => {
    hiddenLocal.value = !hiddenLocal.value
})

const surfaces = ref([
    {
        name: 'slate',
        palette: { 0: '#ffffff', 50: '#f8fafc', 100: '#f1f5f9', 200: '#e2e8f0', 300: '#cbd5e1', 400: '#94a3b8', 500: '#64748b', 600: '#475569', 700: '#334155', 800: '#1e293b', 900: '#0f172a', 950: '#020617' }
    },
    {
        name: 'gray',
        palette: { 0: '#ffffff', 50: '#f9fafb', 100: '#f3f4f6', 200: '#e5e7eb', 300: '#d1d5db', 400: '#9ca3af', 500: '#6b7280', 600: '#4b5563', 700: '#374151', 800: '#1f2937', 900: '#111827', 950: '#030712' }
    },
    {
        name: 'zinc',
        palette: { 0: '#ffffff', 50: '#fafafa', 100: '#f4f4f5', 200: '#e4e4e7', 300: '#d4d4d8', 400: '#a1a1aa', 500: '#71717a', 600: '#52525b', 700: '#3f3f46', 800: '#27272a', 900: '#18181b', 950: '#09090b' }
    },
    {
        name: 'neutral',
        palette: { 0: '#ffffff', 50: '#fafafa', 100: '#f5f5f5', 200: '#e5e5e5', 300: '#d4d4d4', 400: '#a3a3a3', 500: '#737373', 600: '#525252', 700: '#404040', 800: '#262626', 900: '#171717', 950: '#0a0a0a' }
    },
    {
        name: 'stone',
        palette: { 0: '#ffffff', 50: '#fafaf9', 100: '#f5f5f4', 200: '#e7e5e4', 300: '#d6d3d1', 400: '#a8a29e', 500: '#78716c', 600: '#57534e', 700: '#44403c', 800: '#292524', 900: '#1c1917', 950: '#0c0a09' }
    },
    {
        name: 'soho',
        palette: { 0: '#ffffff', 50: '#f4f4f4', 100: '#e8e9e9', 200: '#d2d2d4', 300: '#bbbcbe', 400: '#a5a5a9', 500: '#8e8f93', 600: '#77787d', 700: '#616268', 800: '#4a4b52', 900: '#34343d', 950: '#1d1e27' }
    },
    {
        name: 'viva',
        palette: { 0: '#ffffff', 50: '#f3f3f3', 100: '#e7e7e8', 200: '#cfd0d0', 300: '#b7b8b9', 400: '#9fa1a1', 500: '#87898a', 600: '#6e7173', 700: '#565a5b', 800: '#3e4244', 900: '#262b2c', 950: '#0e1315' }
    },
    {
        name: 'ocean',
        palette: { 0: '#ffffff', 50: '#fbfcfc', 100: '#F7F9F8', 200: '#EFF3F2', 300: '#DADEDD', 400: '#B1B7B6', 500: '#828787', 600: '#5F7274', 700: '#415B61', 800: '#29444E', 900: '#183240', 950: '#0c1920' }
    }
]);

const ui = useThemeStateStore()
// const presets = {
//     Aura,
//     Lara
// };
// const presetOptions = ref(Object.keys(presets));
let firstLoad = true
onMounted(async () => {
    await nextTick()
    if (ui.darkTheme) {
        ui.toggleDarkMode(true)
    }
    firstLoad = false;
    // if (ui.color) {
    //     ui.updateColors('primary')
    // }
    // else if (ui.surface) {
    //     ui.updateColors('surface')
    // }
    // if (ui.preset != 'Aura') {
    ui.setPreset()
    // }
})
</script>
<style>
.hide-animation {
    animation: .3s linear 0s normal forwards hide-animation;
}

.show-animation {
    animation: .3s linear 0s normal backwards show-animation;
}

@keyframes hide-animation {
    0% {
        /* pushes the sun down past the viewport */
        opacity: 1;
    }

    90% {
        opacity: 0;
    }

    100% {
        opacity: 0;
        display: none;
    }
}

@keyframes show-animation {
    0% {
        display: none;
        opacity: 0;
    }

    1% {
        display: block;
    }

    100% {
        opacity: 1;
    }
}
</style>
