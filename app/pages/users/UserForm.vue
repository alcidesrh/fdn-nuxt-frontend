<script setup lang="ts">
const store = useUserStore()
const { entity } = storeToRefs(store)

const localidadStore = useLocalidadStore()
const { items } = storeToRefs(localidadStore)
localidadStore.getItems()
const roleStore = useRoleStore()
const { items: roles } = storeToRefs(roleStore)
roleStore.getItems()
const permisoStore = usePermisoStore()
const { items: permisos } = storeToRefs(permisoStore)
permisoStore.getItems()

const data = ref({
  localidades: items,
  roles,
  permisos,
  item: computed(() => entity.value.item),
})
</script>

<template>
  <CrudForm :data="data" :store="store" :arg="$route.params.id ? { username: $route.params.id } : null">
    <template #left-header="{ user }">
      <span class="hint--right hint--error hint--bounce font-medium u-text-1">
        <span v-if="user">{{ user.nombre }}: {{ user.username }}</span>
        <span v-else>Nuevo usuario</span>
      </span>
    </template>
    <template #localidad="{ schema }">
      <FormKitSchema :schema="schema" :data="data" />
    </template>
  </CrudForm>
</template>
