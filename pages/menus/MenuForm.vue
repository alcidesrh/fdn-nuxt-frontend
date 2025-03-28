<template>
  <CrudForm :store="store" :arg="$route.params.id ? { id: $route.params.id } : null">

    <template #users="{ schema }">
      <Fieldset v-bind="schema.props" class="form-wrapper min-w-400px">
        <PickList v-model="allowUsers" dataKey="label" breakpoint="600px" :showTargetControls="false"
          :showSourceControls="false" scrollHeight="20rem">
          <template #option="{ option }">
            {{ option.label }}
          </template>

          <template #sourceheader="{ header }">
            <div class="u-text-1 font-medium u-pb-xs border-b border-b-1 border-surface-contrast-300">Restringidos
            </div>
            <div>
              <AutoComplete v-model="value" :suggestions="items" @complete="search" size="small" />
              <InputText v-model="value1" type="text" size="small" placeholder="Small" />
            </div>
          </template>
          <template #targetheader="{ header }">
            <div class="u-text-1 font-medium u-pb-xs border-b border-b-1 border-surface-contrast-300">Autorizados</div>
          </template>

        </PickList>
      </Fieldset>
    </template>

    <!-- <template #users_restringidos="{ schema }">
      <Fieldset v-bind="schema.props" class="form-wrapper min-w-400px">
        <PickList v-model="allowUsers" dataKey="label" breakpoint="600px" :showTargetControls="false"
          :showSourceControls="false" scrollHeight="20rem">
          <template #option="{ option }">
            {{ option.label }}
          </template>
        </PickList>
      </Fieldset>
    </template> -->
  </CrudForm>
</template>

<script setup lang="ts">
import { Menu } from '~/types/menu';
const store = useMenuStore()
const storeUser = useUserStore()

const { item, items } = storeToRefs(store) as Record<'item', Ref<Menu>>
store.getItems()

type item = Ref<Menu>

const { items: usuarios } = storeToRefs(storeUser)
storeUser.getItems()

const parent = computed(() => items.value.filter(v => item.value.id != v.value && (item.value?.children ? !item.value?.children || !item.value?.children.includes(v.value) : true)))

const children = computed(() => items.value.filter(v => item.value.id != v.value && v.value != item.value.parent))

const allowUsersList = computed(() => usuarios.value.filter(v => !item.value?.denyUsers || !item.value?.denyUsers.includes(v.value)))

const denyUsersList = computed(() => usuarios.value.filter(v => !item.value?.allowUsers || !item.value?.allowUsers.includes(v.value)))

const allowUsers = ref()
const denyUsers = ref()

watch(() => allowUsersList.value, (v) => {
  allowUsers.value = [v, item.value.allowUsers || []]
}, {
  once: true
})
watch(() => allowUsers.value, (v) => {

  if (typeof v[1] != 'undefined') {
    item.value.allowUsers = v[1].map(v => v.value)
  }
})

watch(() => denyUsersList.value, (v) => {
  denyUsers.value = [v, item.value.denyUsers]
}, {
  once: true
})
watch(() => denyUsers.value, (v) => {
  if (typeof v[1] != 'undefined') {
    item.value.denyUsers = v[1].map(v => v.value)
  }
})

const data = ref({
  children: children,
  parent: parent,
})
</script>
