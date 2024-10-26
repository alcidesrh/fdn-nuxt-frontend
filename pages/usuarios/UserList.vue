<script setup lang="ts">
import { jsonToGraphQLQuery } from '../../utils/json-to-graphql-query/src';
import { Estacion } from '~/graphql/graphql';
import gql from 'graphql-tag';

const userStore = useUserStore()
userStore.ini()
const { collection } = storeToRefs(userStore)


</script>
<template>
  <div>
    <collection-list :collection="collection" @sort="userStore.sort">
      <template #action="{ data }">
        <div class="flex gap-5 items-center justify-center w-full">
          <Icon name="icon-park-outline:delete" class="action delete" mode="svg" />
          <NuxtLink :to="{ name: 'usuario_edit', params: { username: data.username } }">
            <Icon name="icon-park-outline:pencil" class="action edit" mode="svg" />
          </NuxtLink @click="edit">
        </div>
      </template>
    </collection-list>
  </div>
</template>
<style scope></style>
