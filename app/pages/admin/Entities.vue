<script setup lang="ts">
import routes from '~/router.options'

const admin = useAdminStore()
admin.getEntities()

const $router = useRouter()
const lisRoutes = routes.routes()[0].children.filter(v => v.children && v.children.length > 0 && v.children.filter(v => str.countSubstrings(v.name, '_list')))

const { entities, openEntityList } = storeToRefs(admin)

const icons = {
  Enclave: 'icon-park-outline:hospital-two',
  SalidaLog: 'icon-park-outline:log',
  ParadaIntermedia: 'icon-park-outline:pennant',
  BoletoLog: 'icon-park-outline:log',
  Action: 'icon-park-outline:page-template',
  RecorridoAsientoPrecio: 'icon-park-outline:paper-money-two',
  Recorrido: 'icon-park-outline:s-turn-left',
  Parada: 'icon-park-outline:parking',
  Menu: 'icon-park-outline:menu-unfold-one',
  Permiso: 'icon-park-outline:protect',
  Salida: 'icon-park-outline:time',
  Role: 'icon-park-outline:people-safe',
  Ruta: 'icon-park-outline:road',
  Venta: 'icon-park-outline:funds',
  User: 'icon-park-outline:user',
  Nacion: 'icon-park-outline:world',
  Piloto: 'icon-park-outline:user-business',
  Localidad: 'icon-park-outline:local',
  Estacion: 'icon-park-outline:home-two',
  Asiento: 'icon-park-outline:baby-car-seat',
  Agencia: 'icon-park-outline:pyramid-one',
  Cliente: 'icon-park-outline:every-user',
  Factura: 'icon-park-outline:bill',
  Boleto: 'icon-park-outline:tickets-two',
  Empresa: 'icon-park-outline:city',
  Bus: 'icon-park-outline:bus-two',
}
const items = computed(() => {
  const items = []
  if (entities.value.length === 0) {
    return []
  }
  entities.value.map((v) => {
    const t = lisRoutes.find(r => r.name === v)
    if (t) {
      items.push(
        {
          label: str.chain(v).snakeCase().replaceAll('_', ' ').titleCase(),
          path: t.path,
          icon: t.meta.icon,
        },
      )
    }
    else {
      items.push({
        label: str.chain(v).snakeCase().replaceAll('_', ' ').titleCase(),
        path: `/`,
        icon: icons[v],
      })
    }
  })
  return items
})

const selected = ref()

watch(selected, (newValue) => {
  if (newValue) {
    $router.push({ path: newValue.path })
  }
})
</script>

<template>
  <div>
    <div class="entity-wrap" @click="openEntityList = !openEntityList">
      <div class="flex items-center justify-center">
        <Icon name="icon-park-outline:down" class="text-surface-600 transition-all u-mr-2xs" :class="{ 'rotate-90': !openEntityList }" />
        <span>Entidades</span>
      </div>
      <span class="border-surface-500 mr-2 h-5 w-5 flex items-center justify-center border-1 rounded-full">
        <Icon :name="`icon-park-outline:${!openEntityList ? 'plus' : 'minus'}`" class="text-surface-600 transition-all" :class="{ 'rotate-90': !openEntityList }" />
      </span>
    </div>
    <div class="entity-list" :class="{ open: openEntityList }">
      <div class="sm: grid h-full overflow-hidden u-pl-s">
        <div class="w-full">
          <Listbox v-model="selected" checkmark scroll-height="25rem" fluid :options="items" filter>
            <template #option="slotProps">
              <div class="h-20px flex items-center">
                <Icon v-if="slotProps.option.icon" :name="slotProps.option.icon" class="text-surface-600" size="16" />
                <span class="absolute ml-30px">{{ str.chain(slotProps.option.label).snakeCase().replaceAll('_', ' ').titleCase() }}</span>
              </div>
            </template>
          </Listbox>
        </div>
      </div>
    </div>
  </div>
</template>
