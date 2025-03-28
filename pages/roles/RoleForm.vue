<template>

  <CrudForm :store="store" :arg="$route.params.id ? { id: $route.params.id } : null">
    <template #children="{ schema }">
      <FormKitSchema :schema="schema" :data="data" />
    </template>
    <template #parents="{ schema }">
      <FormKitSchema :schema="schema" :data="data" />
    </template>
  </CrudForm>
</template>

<script setup lang="ts">
import { Permiso } from '~/types/permiso'
import { Role } from '~/types/role'


const store = useRoleStore()
const permisoStore = usePermisoStore()
permisoStore.getItems(true)


const { item } = storeToRefs(store) as Record<any, Ref<Role>>
const { options } = storeToRefs(store) as Record<any, Ref<Array<Record<'value', string>>>>
const { options: permisos } = storeToRefs(permisoStore) as Record<any, Ref<Array<Record<'value', string>>>>

const parents = computed(() => options.value.filter(v => item.value.id != v.value && (item.value?.children ? !item.value?.children || !item.value?.children.includes(v.value) : true)))

const children = computed(() => options.value.filter(v => item.value.id != v.value && (item.value?.parents ? !item.value?.parents || !item.value?.parents.includes(v.value) : true)))

// const permisosOptions = computed(() => permisos.value.filter(v => item.value. != v.value && (item.value?.parents ? !item.value?.parents || !item.value?.parents.includes(v.value) : true)))

const data = ref({
  children: children,
  parents: parents,
  permisos: permisos
})
</script>
