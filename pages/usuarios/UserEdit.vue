<template>

  <div class="w-full h-full @container">
    <div class="grid @4xl:flex justify-between u-mb-s">
      <div v-show="user?.username" class="grid">
        <div class="flex items-center gap-1 mb-2">
          <icon name="ic:baseline-numbers" size="18" />
          <span class="u-text-1 font-medium ml-2">{{ `${user?._id}` }} </span>
        </div>
        <div class="flex items-center gap-1 my-2 u-text-1">
          <icon name="icon-park-outline:user" size="18" />
          <span class="u-text-1 font-medium ml-2"> {{ `${user?.username}` }}: </span> <span class="ml-1">{{ `
            ${user?.nombre} ${user?.apellido} ` }}</span>
        </div>
      </div>
      <div class="grid @4xl:flex my-2 justify-end w-fit h-fit ">
        <span class="flex gap-3">
          <icon name="icon-park-outline:calendar" size="18" mode="svg" />
          <span class="font-medium">Actualizado:</span> {{ month_day_hour_format(user?.updatedAt) }}
        </span>
        <divider layout="vertical" />
        <span class="flex gap-3">
          <icon name="icon-park-outline:calendar" size="18" mode="svg" />
          <span class="font-medium">Creado:</span> {{ month_day_hour_format(user?.createdAt) }}
        </span>
      </div>
      <!-- <divider class="u-mb-l ml-auto" /> -->
    </div>
    <div v-if="form.length && user">
      <div class="flex flex-wrap justify-end u-mb-l gap-5 items-center">
        <div class=" hidden @3xl:flex @2xl:justify-center @4xl:justify-end w-full @4xl:w-fit h-fit gap-5 ">

          <CrudBotons @delete="toggleConfirm = !toggleConfirm" @cancel="$router.push({ name: 'usuario_collection' })"
            @submit="submit" />

        </div>
      </div>
      <FormKit ref="userForm" v-model="user" id="entityForm" :actions="false" type="form">
        <div class="grid @4xl:flex @4xl:flex-wrap gap-5 @4xl:gap-10 m-auto justify-center @4xl:justify-start">
          <FormKitSchema :schema="form" :data="data" :library="library" />
        </div>
      </FormKit>
      <div class="flex flex-wrap justify-end u-mt-l gap-5 items-center">
        <div class=" flex justify-center @4xl:justify-end w-full @4xl:w-fit h-fit gap-5 ">

          <CrudBotons @delete="toggleConfirm = !toggleConfirm" @cancel="$router.push({ name: 'usuario_collection' })"
            @submit="submit" />

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


const userStore = useUserStore()

userStore.editIni(route.params.username)

const { item: user, form } = storeToRefs(userStore)

const data = ref({})
const toggleConfirm = ref(false)

function remove() {
  userStore.remove()
  toggleConfirm.value = false
}
function submit() {
  userStore.update()
  toggleConfirm.value = false
}


</script>
