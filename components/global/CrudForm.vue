<template>
  <div class="w-full h-full @container">
    <div v-if="(formkitSchema.length && item) || true">
      <div class="fdn-form-header">
        <div class="grid @2xl:flex justify-between w-full">
          <slot name="left-header">
            <span class="u-text-2 font-semibold ">{{ item?.id ? 'Editar ' : 'Nuevo ' }} {{
              store.metadata.entity
            }}</span>
          </slot>
          <div class="flex justify-end items-end">
            <slot name="right-header">
              <div class="flex flex-wrap justify-end gap-5 align-middle">

                <CrudButton @delete="store.remove();" @cancel="$router.push({ name: metadata.routes.list })"
                  :edit="!!item?.id" />
              </div>
            </slot>
          </div>
        </div>
      </div>

      <div class="u-mt-m lg:u-mt-l flex flex-wrap  xl:max-w-1500px mx-auto gap-5 lg:gap-15" style="z-index: 1;">
        <FormKitSchema :schema="formkitSchema" :data="data" />
      </div>
      <pre>
  {{ formkitSchema }}
  
</pre>
      <div class="m-auto">
        <FormKitMessages />
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

interface Props {
  store: Store
  arg?: any
  columns?: number,
  data?: any
}
const { columns = 3, store, arg, data } = defineProps<Props>()

store.setFormkitSchema()

const { item, formkitSchema, metadata } = storeToRefs(store)
item.value = {}
if (arg) {
  store.resource(arg)
}


</script>
