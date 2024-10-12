<template>

  {{ params }}
  <collection-list :collectionStore="{ columns: columns, params: params, collection: collection, data: data }"
    :loading="loading" @sort="userCollectionStore.sort">

    <template #header>
      <div class="flex flex-wrap justify-between u-mb-l">
        <div>
          <span class="u-text-2">Usuarios</span>
        </div>

        <div>
          <div class="flex flex-wrap gap-5">
            <Button label="Importar" icon="pi pi-download" severity="secondary" outlined /><Button label="Exportar"
              icon="pi pi-upload" severity="secondary" outlined />
            <Button label="Nuevo" icon="pi pi-plus" outlined />
            <Button label="Eliminar" icon="pi pi-trash" severity="danger" outlined />
          </div>
        </div>
      </div>
    </template>
    <template #action="{ _id, id }">
      <div class="flex gap-5 items-center justify-center w-full">
        <Icon name="icon-park-outline:delete"
          class="[&>g>path]:stroke-2px  text-orange-500 cursor-pointer u-text-1! action" mode="svg" />
        <NuxtLink :to="{ name: 'users-id-edit', params: { id: _id, aa: id } }">
          <Icon name="icon-park-outline:pencil" class=" primary-contrast-500 cursor-pointer  u-text-1! action"
            mode="svg" />
        </NuxtLink>
      </div>
    </template>
  </collection-list>
</template>
<!-- //////////////////////////////////////////////////////////////////////////////////////// -->
<!-- //////////////////////////////////////////////////////////////////////////////////////// -->
<script setup lang="ts">

import { Maybe, MetadataResource, User, UserPaginationInfo } from '~/graphql/graphql';
import { users } from '~~/graphql/queries'
import pipe from 'ramda/es/pipe'

const { filterInputClasses } = useCollection()

const userCollectionStore = useUserCollectionStore()
const { columns, collection, params, data } = storeToRefs(userCollectionStore)

const metadata = useMetadataStore()

const { onResult, loading, onError } = useQuery(
  users,
  () => params.value

)
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
      data.value.loading = false
    }
    if (!result.data) return
    collection.value.items = result.data?.users?.collection
    collection.value.pagination.itemsPerPage = result.data?.users?.paginationInfo.itemsPerPage
    collection.value.pagination.lastPage = result.data?.users?.paginationInfo.lastPage
    collection.value.pagination.totalCount = result.data?.users?.paginationInfo.totalCount
    y.value = 0

  }
);
onError(merror as any);

watch(() => loading.value, (v) => {
  data.value.loading = v
})
const getColumns = (a: any) => {

  const { onResult, onError } = a
  onResult(
    (result: {
      networkStatus: Number;
      data: {
        columnsMetadataResource: Maybe<MetadataResource>;
      };
    }) => {
      if (result.networkStatus != 7) {
        return;
      }
      columns.value = [{ action: true }, ...result.data.columnsMetadataResource?.columns.collection.map((i: any) => {
        let temp: any = useCloned(i).cloned.value;
        let temp2: any = {};
        if (temp.schema && filterInputClasses[temp.schema.$formkit]) {
          temp2 = filterInputClasses[temp.schema.$formkit];
          if (temp2[temp.name]) {
            temp.schema = { ...temp.schema, ...temp2[temp.name], 'eventbus': 'collection' };
          }
        }
        return temp;
      })];

    }
  )
  onError(merror)
}
const c = pipe(metadata.ini, getColumns)
c('user')
const { y } = useWindowScroll()


userCollectionStore.$subscribe((mutation, state) => {
  // import { MutationType } from 'pinia'
  mutation.type // 'direct' | 'patch object' | 'patch function'
  // same as cartStore.$id
  // only available with mutation.type === 'patch object'
  mutation.payload // patch object passed to cartStore.$patch()

  console.log(mutation)
  // persist the whole state to the local storage whenever it changes
  // localStorage.setItem('cart', JSON.stringify(state))
})


</script>
<style scope>
.action {
  transition: all .2s;

  &:hover {
    scale: 2;
    background-color: var(--p-primary-contrast-700);
    border-radius: 999px;
    color: var(--p-primary-contrast-100);
    padding: 3px;
  }
}
</style>
