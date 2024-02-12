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

    watch(result, value => {
      console.log(value)
    })
    return {
    }
  },

  mounted() {
    console.log(this.count) // 0
  }
}

</script>

<template></template>
