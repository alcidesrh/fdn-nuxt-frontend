<template>

  <div class="flex justify-between items-center text-14px surface-contrast-600">
    <div>
      <span class="font-bold">ID:</span> {{ user?._id }}
    </div>
    <div class="flex gap-5 font-medium  justify-end ">
      <span>
        <span class="font-bold">Actualizado:</span> {{ dformat(user?.updatedAt) }}
      </span>
      <span>
        <span class="font-bold">Creado:</span> {{ dformat(user?.createdAt) }}
      </span>
    </div>
  </div>
  <divider class="u-mb-l mx-auto" />
  <div class="flex justify-between u-mb-l ">
    <div v-show="user?.username" class="grid">
      <div class="flex items-center gap-3 mb-2">
        <icon name="icon-park-outline:user" size="18" />
        <span class="u-text-1 font-medium">{{ `${user?.username}` }}</span>
      </div>
      <span class="ml-7">{{ ` ${user?.nombre} ${user?.apellido} ` }}</span>
    </div>
    <div class="gap-3">
      <Button @click="submit" label="Guardar" class="mr-5" icon="pi pi-save" />
      <Button label="Listado" class="mr-5" icon="pi pi-save" outlined severity="info" />
      <Button label="Eliminar" severity="danger" outlined icon="pi pi-trash" />
    </div>
  </div>
  <FormKit v-if="form.length && user" ref="userForm" v-model="user" id="entityForm" :actions="false" type="form">
    <div class="grid md:flex md:flex-wrap gap-5 md:gap-10 m-auto">
      <FormKitSchema :schema="form" :data="data" :library="library" />
    </div>
  </FormKit>
  <div v-else class="flex flex-wrap justify-center gap-5">
    <SkeletonForm />

    <SkeletonForm />

    <SkeletonForm />

  </div>

</template>
<script setup lang="ts">

import { ref, markRaw } from "vue";
import type { MenuItem } from "~~/types/menuitem";

import Fieldset from '../../form/inputs/fieldset/Fieldset.vue';
const library = markRaw({
  Fieldset: Fieldset
})

const userForm = ref(null)

const userStore = useUserStore()

const { item: user, form } = storeToRefs(userStore)

useFetchItem<MenuItem>("create_forms/user").then(({ retrieved }) => {
  const temp = formkitClasses(retrieved.value['hydra:member'])
  form.value = temp
});

const route = useRoute()
user.value = null
const data = ref({})
const { result, loading } = getResource('getUserByUsernameUser', ['id', '_id', 'nombre', 'username', 'apellido', 'telefono', 'email', 'nit', 'createdAt', 'updatedAt'], { reference: user, args: { username: route.params.username } })

function submit() {
  userForm.value.node.submit()
}
watch(() => result.value, (v) => {
})
</script>
