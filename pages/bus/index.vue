<template>
  <Card>
    <template #content>
      <collection-list
        :collectionStore="{ columns: list.columns, params: list.params, collection: list.collection, data: list.data }"
        :loading="loading" @sort="list.sort">
      </collection-list>

    </template>
  </Card>
</template>
<!-- //////////////////////////////////////////////////////////////////////////////////////// -->
<!-- //////////////////////////////////////////////////////////////////////////////////////// -->
<script setup lang="ts">

import { useQuery } from '@vue/apollo-composable'
import { Bus, BusPaginationInfo, Maybe, MetadataResource, } from '~/graphql/graphql';
import { buses } from '~~/graphql/queries'
import pipe from 'ramda/es/pipe'


const { filterInputClasses } = useCollection()

const list = useBusCollectionStore()

const metadata = useMetadataStore()

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
      list.columns = result.data.columnsMetadataResource?.columns.collection.map((i: any) => {
        let temp: any = useCloned(i).cloned.value;
        let temp2: any = {};
        if (temp.schema && filterInputClasses[temp.schema.$formkit]) {
          temp2 = filterInputClasses[temp.schema.$formkit];
          if (temp2[temp.name]) {
            temp.schema = { ...temp.schema, ...temp2[temp.name], 'eventbus': 'collection' };
          }
          else if (temp2['default']) {
            temp.schema = { ...temp.schema, ...temp2['default'], 'eventbus': 'collection' };
          }
        }
        return temp;
      });
    }
  )
  onError(merror)
}
const c = pipe(metadata.ini, getColumns)
c('bus')
const { y } = useWindowScroll()
const { onResult, loading, onError } = useQuery(
  buses,
  () => list.params,
)
onResult(
  (result: {
    data: {
      buses: {
        collection: Maybe<Array<Maybe<Bus>>>;
        paginationInfo: BusPaginationInfo;
      }
    }
  }) => {
    if (result.networkStatus == 7) {
      list.data.loading = false
    }
    if (!result.data) return
    list.collection.items = result.data?.buses?.collection
    list.collection.pagination.itemsPerPage = result.data?.buses?.paginationInfo.itemsPerPage
    list.collection.pagination.lastPage = result.data?.buses?.paginationInfo.lastPage
    list.collection.pagination.totalCount = result.data?.buses?.paginationInfo.totalCount
    y.value = 0

  }
);
onError(merror as any);

watch(() => loading.value, (v) => {
  list.data.loading = v
})


</script>
