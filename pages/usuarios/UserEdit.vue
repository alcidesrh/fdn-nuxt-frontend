<template>
  <div>
    <FormKit v-model="data" id="entityForm" :actions="false" v-if="form.length" type="form">
      <FormKitSchema :schema="form" :data="data" :library="library" />
    </FormKit>
    <SkeletonForm v-else />
  </div>
</template>
<script setup lang="ts">
import { user as query } from '~~/graphql/queries';
import { ref, markRaw } from "vue";
import type { MenuItem } from "~~/types/menuitem";
import type { SubmissionErrors } from "~~/types/error";
import { GraphQLInt, GraphQLObjectType, GraphQLSchema, GraphQLString, printSchema } from 'graphql';
import gql from 'graphql-tag';
import { graphql, buildSchema } from "graphql"
import type { User } from '~/graphql/graphql';

import Fieldset from 'primevue/fieldset';
const library = markRaw({
  Fieldset: Fieldset
})


const userStore = useUserStore()

const { item: user, form } = storeToRefs(userStore)

watch(() => user.value, (v) => {

})
useFetchItem<MenuItem>("create_forms/user").then(({ retrieved }) => {
  const temp = formkitClasses(retrieved.value['hydra:member'])
  form.value = [
    {
      $el: 'div',
      attrs: {
        class: `flex flex-wrap justify-center gap-10`
      },
      children: temp
    },
  ] as any
  log(temp)
});
// }


const route = useRoute()

const data = ref({})
const { result, loading } = getResource('getUserByUsernameUser', ['nombre', 'username', 'apellido', 'telefono', 'email', 'nit'], { reference: data, args: { username: route.params.username } })

watch(() => result.value, (v) => {
})
</script>
