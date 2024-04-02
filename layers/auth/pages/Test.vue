<script>
import { watch } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'


export default {
  setup() {
    definePageMeta({
      layout: false,
      path: "/test",
    });
    const { result } = useQuery(gql`
      query getBook{
        books{
         edges{
          node{
            id
            title
          }
        }
        }
       }
           `)

  },
}

</script>

<template></template>
