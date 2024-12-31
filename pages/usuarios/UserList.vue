<template>
  <div>
    <collection-list :collection="collection" @sort="store.sort" @removeMultiple="removeMultiple" :deleted="deleted">
      <template #header>
        <div class="flex flex-wrap justify-between u-mb-l">
          <div>
            <span class="u-text-2 capitalize font-medium surface-contrast-600">{{ metadata.singular }}</span>
          </div>

          <div class="flex flex-wrap gap-5">
            <Button label="Importar" icon="pi pi-download" severity="secondary" outlined />
            <Button label="Exportar" icon="pi pi-upload" severity="secondary" outlined />
          </div>
        </div>
      </template>
      <template #action="{ data }">
        <div class="collection-action-wrapper flex gap-1 items-center justify-center w-full relative">
          <span class="flex items-center justify-center">
            <NuxtLink :to="{ name: metadata.routes.edit, params: { username: data.username } }" class="absolute">
              <Icon name="icon-park-outline:pencil" class="action edit " mode="svg" />
            </NuxtLink>
          </span>
          <span class="flex items-center justify-center">
            <Icon name="icon-park-outline:delete" class="action delete absolute" mode="svg" @click="remove(data)" />
          </span>
        </div>
      </template>
    </collection-list>
  </div>
</template>
<script setup lang="ts">
import { User } from '~/types/user';

const store = useUserStore()

const { metadata, collection, item } = storeToRefs(store)

store.iniCollection()

let chanel = ''
let unsubscribe: any;

const deleted = ref(false);

function unsubscribeChanel() {
  if (typeof unsubscribe != undefined && unsubscribe) {
    unsubscribe()
  }
}
function remove(user: User) {
  unsubscribeChanel()
  chanel = random()
  msgbus('remove').emit({ chanel: chanel, header: 'Eliminar', message: getAlertText('remove', `el usuario ${user.username}`) })
  unsubscribe = msgbus(chanel).on((v: any) => {
    unsubscribeChanel()
    item.value = user
    store.remove(user.id)  // selected.value = []

  });
}

function removeMultiple(items: Ref<[any]>) {
  unsubscribeChanel()
  chanel = random()
  let text = ''

  text = items.value.length > 1 ? getAlertText('remove_multiple', 'los usuarios ' + items.value.map(i => i.username).join(', ')) : 'Eliminar usuario ' + getAlertText('remove', { username: items.value[0]?.username })

  msgbus('remove').emit({ chanel: chanel, message: text })
  unsubscribe = msgbus(chanel).on((v: any) => {
    unsubscribeChanel()
    store.removeMultiple(items.value)
    deleted.value = !deleted.value
  });
}

onUnmounted(() => {
  unsubscribeChanel()
})


</script>
