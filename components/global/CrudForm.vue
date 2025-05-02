<template>
  <div class="w-full h-full @container">
    <div v-if="(formkitSchema.length && item) || true" class="grid">
      <div class="fdn-form-header ">
        <div class="grid @2xl:flex justify-between w-full items-start">
          <slot name="left-header">
            <span class="u-text-2 absolute  font-semibold ">
              {{ item?.id ? 'Editar ' : 'Nuevo ' }} {{ store.metadata.entity }}</span>

          </slot>
          <div class="flex justify-end items-end">
            <slot name="right-header">
              <div class="flex flex-wrap justify-end gap-5 align-middle">
                <CrudButton @submit="submit" @delete="store.remove();"
                  @cancel="$router.push({ name: metadata.routes.list })" :edit="!!item?.id" />
              </div>
            </slot>
          </div>
        </div>
      </div>

      <div class="form-wrapper mx-auto u-px-s u-mt-2xl">
        <div class="flex flex-wrap  gap-5 lg:gap-15" style="z-index: 1;">
          <FormKitSchema :schema="formkitSchema" :data="data" />
        </div>
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
import { FormKitMessages } from '@formkit/vue'
import { getNode } from '@formkit/core'

interface Props {
  store: Store
  arg?: any
  columns?: number,
  data?: any,
  formId?: string
}
const { columns = 3, store, arg, data, formId } = defineProps<Props>()

store.setFormkitSchema()

const { item, formkitSchema, metadata } = storeToRefs(store)

item.value = {}
if (arg) {
  store.resource(arg)
}

function submit() {
  const form = getNode(formId)
  form.submit()
}

</script>
