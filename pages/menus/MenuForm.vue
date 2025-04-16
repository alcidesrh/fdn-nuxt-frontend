<template>
  <div>
    <!-- <CrudForm :data="data" :store="store" :arg="$route.params.id ? { id: $route.params.id } : null" /> -->
    <!-- <FormKit ref="form" :data="data" v-model="item" :actions="false" id="crudForm" type="form" @submit="store.submit"> -->
    <!-- <FieldsetPrimeVue></FieldsetPrimeVue> -->
    <!-- <FormKitSchema :schema="test" :data="data" /> -->
    <!-- <pre>
      {{ store.formkitSchema }}
     </pre> -->

    <FormKitSchema :schema="store.formkitSchema" :data="data" />
    <!-- </FormKit> -->
    <!-- <Test -->
    <!-- :value="[{ header: 'Model', ...item }, { header: 'Data', ...data }, { header: 'Formulario', ...store.formkitSchema }]" /> -->
  </div>
</template>


<script setup lang="ts">
import { Menu } from '~/types/menu';
import { Permiso } from '~/types/permiso';
import { Role } from '~/types/role';
const store = useMenuStore()
const storeUser = useUserStore()
const storeRole = useRoleStore()
const storePermiso = usePermisoStore()


const { item, items } = storeToRefs(store) as Record<'item', Ref<Menu>>
store.getItems()
store.setFormkitSchema()

const { items: roles } = storeToRefs(storeRole) as Record<'items', Ref<[Role]>>
storeRole.getItems()

const { items: permisos } = storeToRefs(storePermiso) as Record<'items', Ref<[Permiso]>>
storePermiso.getItems()


const { items: usuarios } = storeToRefs(storeUser)
storeUser.getItems()

const parent = computed(() => items.value.filter(v => item.value.id != v.value && (item.value?.children ? !item.value?.children || !item.value?.children.includes(v.value) : true)))

const children = computed(() => items.value.filter(v => item.value.id != v.value && v.value != item.value.parent))
const data = ref({
  item: item.value,
  users: computed(() => usuarios.value),
  allowUsers: computed(() => item.value.allowUsers),
  denyUsers: computed(() => item.value.denyUsers),
  roles: computed(() => roles.value),
  allowRoles: computed(() => item.value.roles),
  permisos: computed(() => permisos.value),
  allowPermisos: computed(() => item.value.permisos),
  twoColumn: 'flex flex-wrap  xl:justify-center gap-10'


})

const channel = new BroadcastChannel('app-data');



watch(() => item.value, (v) => {
  const temp = [{ header: 'Model', ...toRaw(item.value) }, { header: 'Data', ...toRaw(unref(useCloned(data.value).cloned.value)) }, { header: 'Formulario', ...toRaw(store.formkitSchema) }]
  const channel = new BroadcastChannel('app-data');
  channel.postMessage(temp);

}, { deep: true })

</script>
