<template>
  <Card>
    <template #content>
      <div class="flex justify-end u-mb-l">

        <!-- <nav> -->
        <!-- <Panel toggleable @update:collapsed="v => toggle = v" :class="{ 'toggle': toggle }">

            <template #footer>
              <div class="flex flex-wrap items-center justify-between gap-4">
                <div class="flex items-center gap-2">
                  <Button icon="pi pi-filter" rounded text></Button>
                  <Button icon="pi pi-bookmark" severity="secondary" rounded text></Button>
                </div>
                <span class="text-surface-500 dark:text-surface-400">Updated 2 hours ago</span>
              </div>
            </template>
<template #icons> -->
        <Button icon="pi pi-cog" severity="secondary" rounded text @click="toggle = !toggle" />
        <Menu ref="menu" id="config_menu" popup />
        <!-- </template> -->
        <UserFilter v-model="filter" :loading="loading" />
        {{ filter }}
        <!-- </Panel>  -->
        <!-- </nav> -->
      </div>
      <collection-list :loading="loading">
        <template v-slot:cell="{ column, value }">
          <div class="normal-case">
            <span v-if="column.field == 'createdAt'">
              {{ dformat(value) }}
            </span>
            <div class="flex justify-around gap-1" v-else-if="column.field == 'roles'">
              <Chip v-for="r, i in value" :key="i" :label="r"
                pt:root:class=" u-mr-3xs u--text-1 u-p-3xs u-px-xs lowercase" />
            </div>
            <span v-else :class="isHighlighted(column)" :data-property="column.field">
              {{ value }}
            </span>
          </div>
        </template>
      </collection-list>
    </template>
  </Card>
</template>
<style>
.p-panel {
  transition: width .5s;
  width: 100%;

  &.toggle {
    width: 120px;
  }

  &>.p-panel-header {
    justify-content: end;
  }
}
</style>
<script setup lang="ts">
import { useQuery, useLazyQuery } from '@vue/apollo-composable'
import { Maybe, User, UserPaginationInfo } from '~/graphql/graphql';
import { users } from '~~/graphql/queries'
import { ApolloError } from '@apollo/client/errors';

const metadataUser = useUserMetadataStore()
const metadata = useMetadataStore()
const { dformat } = useDate()

// onBeforeMount(async () => {
await metadataUser.ini()
metadata.ini('user')
// })

const toggle = ref(false)
const bus = useEventBus('msg')
const { y } = useWindowScroll()

const { params, stopLoading } = useCollection()

const { onResult, loading, onError, load } = useLazyQuery(
  users,
  params,
)
const { collection, filter, getProperty } = useCollection()

onResult(
  (result: {
    data: {
      users: {
        collection: Maybe<Array<Maybe<User>>>;
        paginationInfo: UserPaginationInfo;
      }

    }
  }) => {
    if (result.networkStatus == 7) {
      stopLoading.value = !stopLoading.value
    }

    if (!result.data) return

    collection.items = result.data?.users?.collection
    collection.pagination.itemsPerPage = result.data?.users?.paginationInfo.itemsPerPage
    collection.pagination.lastPage = result.data?.users?.paginationInfo.lastPage
    y.value = 0

  }
);
onError(
  (error: ApolloError) => {
    bus.emit({ msg: error.message, type: 'error' })
  }
);

onMounted(() => {
  load()
})
onUnmounted(() => {
  CSS.highlights.clear()
})

const isHighlighted = (i: any) => {
  if (i.search) {
    const property = getProperty(i.field)
    return `highlight ${property}`
  }
  return null
}

</script>

<style scoped>
::highlight(highlight-nombre),
::highlight(highlight-username) {
  background-color: #fde047;
  color: black;
}

::highlight(highlight-nombre) {
  background-color: #6ee7b7;
}

::highlight(highlight-id) {
  background-color: #67e8f9;
}
</style>
