<template>

  <div class="w-full h-full @container">

    <div class="grid @2xl:flex justify-between u-mb-s">
      <div v-show="item?.nombre" class="grid">
        <div class="flex items-center gap-1">
          <span class="font-medium">ID:</span>
          <span class="u-text-1 font-medium ml-2">{{ `${item?._id}` }} </span>
        </div>
        <div class="flex items-center gap-1 my-2 u-text-1">
          <icon name="icon-park-outline:user" size="18" />
          <span class="u-text-1 font-medium ml-2"> {{ `${item?.nombre}` }} </span>
        </div>
      </div>
      <div class="grid @2xl:flex my-2 justify-end w-fit h-fit ">
        <span class="flex gap-3">
          <icon name="icon-park-outline:calendar" size="18" mode="svg" />
          <span class="font-medium">Actualizado:</span> {{ month_day_hour_format(item?.updatedAt) }}
        </span>
        <divider layout="vertical" />
        <span class="flex gap-3">
          <icon name="icon-park-outline:calendar" size="18" mode="svg" />
          <span class="font-medium">Creado:</span> {{ month_day_hour_format(item?.createdAt) }}
        </span>
      </div>
    </div>
    <div v-if="formkitSchema.length && item">
      <div class="flex flex-wrap justify-end u-mb-xs gap-5 items-center">
        <div class=" hidden @3xl:flex @2xl:justify-center @4xl:justify-end w-full @4xl:w-fit h-fit gap-5 ">
          <CrudBotons @delete="remove" @cancel="$router.push({ name: metadata.routes.list })" @submit="submit" />
        </div>
      </div>
      <FormKit v-model="item" id="entityForm" :actions="false" type="form">
        <div class="grid @2xl:flex @4xl:flex-wrap gap-5 @4xl:gap-10 m-auto justify-center @4xl:justify-start w-fit">
          <FormKitSchema :schema="formkitSchema" :data="data" :library="library" />
        </div>
      </FormKit>
      <div class="flex flex-wrap justify-end u-mt-l gap-5 items-center">
        <div class=" flex justify-center @4xl:justify-end w-full @4xl:w-fit h-fit gap-5 ">
          <CrudBotons @delete="remove" @cancel="$router.push({ name: metadata.routes.list })" @submit="submit" />
        </div>
      </div>
    </div>
    <div v-else class="grid flex-wrap justify-center gap-5 w-full m-auto">
      <SkeletonButton :columns="3" class="w-full absolute right-3rem @4xl:right-8rem" />
      <div class="mt-15">
        <SkeletonForm />
        <SkeletonForm />
        <SkeletonForm />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const route = useRoute()
import Fieldset from '~/form/inputs/fieldset/Fieldset.vue';
const library = markRaw({
  Fieldset: Fieldset
})
const store = useEstacionStore()

store.setFormKitSchema()
store.resource2(route.params.slug)

const { item, formkitSchema, metadata } = storeToRefs(store)
const data = ref({})
let chanel = ''
let unsubscribe: any = null
function remove() {
  chanel = `${item.value?.id}_remove`
  msgbus('remove').emit({ chanel: chanel, header: 'Eliminar usuario', message: `Desea eliminar el usuario <b>${item.value?.id}</b> ?` })
  unsubscribe = msgbus(chanel).on((v: any) => {

    if (typeof unsubscribe != undefined && unsubscribe) {
      unsubscribe()
    }

    store.remove()
  });
}
function submit() {
  store.update()
}

onUnmounted(() => {
  if (unsubscribe) {
    unsubscribe()
  }

})

</script>
