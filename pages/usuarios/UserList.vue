<template>
  <div>
    <collection-list :collection="collection" @sort="userStore.sort">
      <template #action="{ data }">
        <div class="flex gap-5 items-center justify-center w-full">
          <Icon name="icon-park-outline:delete" class="action delete" mode="svg" @click="remove(data)" />
          <NuxtLink :to="{ name: 'usuario_edit', params: { username: data.username } }">
            <Icon name="icon-park-outline:pencil" class="action edit" mode="svg" />
          </NuxtLink>
        </div>
      </template>
    </collection-list>
  </div>
</template>
<script setup lang="ts">
import { User } from '~/types/user';


const userStore = useUserStore()
const { refetch } = userStore.ini()
const { collection, item } = storeToRefs(userStore)
let chanel = ''
let unsubscribe: any = null
function remove(user: User) {
  chanel = `${user.username}_remove`
  msgbus('remove').emit({ chanel: chanel, header: 'Eliminar usuario', message: `Desea eliminar el usuario <b>${user?.username}</b> ?` })
  unsubscribe = msgbus(chanel).on((v: any) => {

    if (typeof unsubscribe != undefined && unsubscribe) {
      unsubscribe()
    }
    item.value = user
    userStore.remove().then(() => refetch())
  });
}

onUnmounted(() => {
  if (unsubscribe) {
    unsubscribe()
  }

})

</script>
