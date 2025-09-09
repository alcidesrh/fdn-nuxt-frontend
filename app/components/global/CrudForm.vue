<template>
    <div class="@container h-full w-full">
        <div v-if="formkitSchema.length" class="grid">
            <div class="fdn-form-header">
                <div
                    class="@md:flex @md:justify-between grid w-full items-start"
                >
                    <slot name="left-header" :user="entity.item">
                        <span
                            aria-label="yeeee"
                            class="hint--right hint--error hint--bounce u-text-2 surface-contrast-600 font-semibold"
                            >{{ entity.item?.id ? "Editar " : "Nuevo " }}
                            {{ entity.name }}</span
                        >
                    </slot>
                    <div class="u-mt-l @md:mt-0 flex items-end justify-end">
                        <slot name="right-header">
                            <!-- <div class="flex flex-wrap justify-end gap-5 align-middle">
                                <CrudButton @submit="store.submit()" @delete="store.remove()" @cancel="$router.push({ name: entity.routes.list })" :edit="!!entity.item?.id" />
                            </div> -->
                        </slot>
                    </div>
                </div>
            </div>

            <div class="form-wrapper">
                <FormKitSchema :schema="formkitSchema" :data="data">
                    <template #crudBtn>
                        <slot name="CrudButton">
                            <div
                                class="u-mb-m flex flex-wrap justify-end gap-5 align-middle"
                            >
                                <CrudButton
                                    @delete="store.remove()"
                                    @cancel="
                                        $router.push({
                                            name: entity.routes.list,
                                        })
                                    "
                                    :edit="!!entity.item?.id"
                                />
                            </div>
                        </slot>
                    </template>
                </FormKitSchema>
                <div class="m-auto">
                    <FormKitMessages :node="lacandela?.node" />
                </div>
            </div>
        </div>
        <div v-else class="w-full opacity-[0.5]">
            <div
                class="right-2rem @2xl:justify-center @4xl:justify-end flex h-fit w-full justify-end gap-5"
            >
                <SkeletonButton :columns="columns" class="" />
            </div>
            <div class="row-float-left">
                <SkeletonForm :columns="3" :rows="10" />
                <!-- <SkeletonForm />
                <SkeletonForm /> -->
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { FormKitMessages } from "@formkit/vue";
import { Store } from "pinia";

interface Props {
    store: Store;
    arg?: any;
    columns?: number;
    data?: any;
    formId?: string;
}
const { columns = 3, store, arg, data } = defineProps<Props>();

const lacandela = ref(null);
// cl(data, data.value);
data.form = lacandela;
// const data2 = ref({ ...data, form: lacandela });

const { formkitSchema, entity } = storeToRefs(store);
store.setFormkitSchema(arg);
</script>
