<template>
    <div class="w-full h-full @container">
        <div v-if="(formkitSchema.length && entity.item) || true" class="grid">
            <div class="fdn-form-header">
                <div class="grid @md:flex @md:justify-between w-full items-start">
                    <slot name="left-header">
                        <span class="u-text-2 font-semibold surface-contrast-600"> {{ entity.item?.id ? 'Editar ' : 'Nuevo ' }} {{ entity.name }} </span>
                    </slot>
                    <div class="flex justify-end items-end u-mt-l @md:mt-0">
                        <slot name="right-header">
                            <div class="flex flex-wrap justify-end gap-5 align-middle">
                                <CrudButton @submit="store.submit()" @delete="store.remove()" @cancel="$router.push({ name: entity.routes.list })" :edit="!!entity.item?.id" />
                            </div>
                        </slot>
                    </div>
                </div>
            </div>
            <div class="form-wrapper u-px-s u-mt-l md:u-mt-xl">
                <slot name="crud_form">
                    <FormKitSchema :schema="formkitSchema" :data="data" />
                </slot>
                <div class="m-auto">
                    <FormKitMessages />
                </div>
            </div>
        </div>
        <div v-else class="grid flex-wrap justify-center gap-5 w-full m-auto">
            <SkeletonButton :columns="columns" class="w-full absolute right-3rem @4xl:right-8rem" />
            <div class="mt-15">
                <SkeletonForm />
                <SkeletonForm />
                <SkeletonForm />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { FormKitMessages } from '@formkit/vue';

interface Props {
    store: Store;
    arg?: any;
    columns?: number;
    data?: any;
    formId?: string;
}
const { columns = 3, store, arg, data } = defineProps<Props>();

const { formkitSchema, entity } = storeToRefs(store);

store.setFormkitSchema(arg);
</script>
