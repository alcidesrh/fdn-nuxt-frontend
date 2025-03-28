<template>
  <div class="w-full h-full @container">

    <div v-if="formkitSchema.length && item" style="height: 2000px;">

      <FormKit ref="form" v-model="item" :actions="false" id="crudForm" type="form" @submit="store.submit">
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
        <div class="u-mt-m lg:u-mt-l flex flex-wrap " style="z-index: 1;">

          <template v-if="formkitSchema.length">
            <template v-for="(v, i) in formkitSchema" :key="i">
              <!-- <slot :name="v.wrapper ? v.props.id : v.name" :schema="v">
                <crud-field :field="v" :data="data" />
              </slot> -->

              <Fieldset v-if="v.wrapper && v.type == 'Fieldset'" v-bind="v.props" class="form-wrapper">
                <template v-if="v.children">
                  <slot v-for="(v2, i2) in v.children" :key="i2" :name="v2.wrapper ? v2.props.id : v2.name" :schema="v2"
                    :data="data">
                    <crud-field :field="v2" :data="data" />
                    <!-- <FormKitSchema :schema="v2" :data="data" /> -->
                  </slot>
                </template>
              </Fieldset>
              <div v-if="v.wrapper && v.type == 'div'" v-bind="v.props" class="form-wrapper">
                <template v-if="v.children">
                  <slot v-for="(v2, i2) in v.children" :key="i2" :name="v2.wrapper ? v2.props.id : v2.name" :schema="v2"
                    :data="data">
                    <crud-field :field="v2" :data="data" />
                    <!-- <FormKitSchema :schema="v2" :data="data" /> -->
                  </slot>
                </template>
              </div>

            </template>
          </template>
        </div>
        <div class="m-auto">
          <FormKitMessages />
        </div>
      </FormKit>
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
  columns?: number
}
const { columns = 3, store, arg } = defineProps<Props>()

const form = ref(null)

store.setFormkitSchema()

const { item, formkitSchema, metadata } = storeToRefs(store)
item.value = {}
if (arg) {
  store.resource(arg)
}
const data = ref({})

</script>
