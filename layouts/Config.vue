<script setup>
// import { SettingTwo } from '@icon-park/vue-next';


const control = useFloatWidgetStore()


const visible = ref(false);

// const { layoutConfig } = useLayout();

const onConfigButtonClick = () => {
    visible.value = !visible.value;
};

</script>

<template>
    <Button size="small" @click="onConfigButtonClick()" class="btn-float border-r-0 border-rounded-r-0 bg-slate-700"
        :class="{ active: !visible }" raised>
        <setting-two theme="outline" size="24" :strokeWidth="3" fill="#fff" />
    </Button>
    <Drawer v-model:visible="visible" position="right" class="layout-config-sidebar w-26rem" pt:closeButton="ml-auto">
        <div class="p-2">
            <section class="pb-4 flex align-items-center justify-content-between border-bottom-1 surface-border">
                <div>
                    <span class="font-medium block mb-3">Menu Lateral Izquierdo</span>
                    <InputGroup>
                        <FormKit v-model="control.mode" type="radio" options-class="flex gap-4" outer-class="mb-0!"
                            :options="{ bloqueado: 'Bloqueado', editar: 'Editar' }" />
                    </InputGroup>
                </div>
            </section>

            <section class="py-4 flex align-items-center justify-content-between border-bottom-1 surface-border">
                <span :class="['text-xl font-semibold']">Dark Mode</span>
            </section>

            <template>
                <section class="py-4 flex align-items-center justify-content-between border-bottom-1 surface-border">
                    <span class="text-xl font-semibold">Menu Type</span>
                </section>

                <section class="py-4 flex align-items-center justify-content-between border-bottom-1 surface-border">
                    <span class="text-xl font-semibold">Input Variant</span>
                </section>
            </template>

            <section class="py-4 flex align-items-center justify-content-between border-bottom-1 surface-border">
                <span class="text-xl font-semibold">Ripple Effect</span>
            </section>

            <section class="py-4 border-bottom-1 surface-border">
                <div class="text-xl font-semibold mb-3">Themes</div>
                <div class="flex align-items-center gap-2 mb-3">
                    <img src="https://primefaces.org/cdn/primevue/images/themes/aura.png" alt="Aura"
                        style="width: 1.5rem" />
                    <span class="font-medium">Aura</span>
                </div>

            </section>

            <!-- <section class="py-4 border-bottom-1 surface-border">
                <div class="flex align-items-center gap-2 mb-3">
                    <img src="https://primefaces.org/cdn/primevue/images/themes/lara-light-teal.png"
                        alt="Lara Light Teal" class="border-circle" style="width: 1.5rem" />
                    <span class="font-medium">Lara</span>
                </div>
                <div class="flex align-items-center justify-content-between gap-3 mb-3">

                </div>
            </section> -->

        </div>
    </Drawer>
</template>
<style scoped>
.btn-float {
    right: -50px;

    &.active {
        transition-property: translate, padding;
        transition-duration: 1s, 1s;
        translate: -40px;
        padding-left: 5px;
    }

    &:hover {
        transition-property: translate, padding;
        transition-duration: .2s, .2s;
        /* transition: translate .1s; */
        padding-left: 10px;
        translate: -48px;
    }
}
</style>
