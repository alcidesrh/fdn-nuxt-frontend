<template>
  <div class="container mx-auto px-4 max-w-2xl mt-4">
    hola
  </div>
</template>

<script lang="ts" setup>
import { user } from '~~/graphql/queries'
const route = useRoute()
// console.info(route.params)
// const { onResult, loading, onError } = useQuery(
//   user,
//   { id: route.params.aa },
// )
// onResult(
//   (result: {
//     data: {
//       user
//     }
//   }) => {
//     // if (result.networkStatus == 7) {

//     // }
//     console.info(result)
//   }
// );
// onError(merror as any);

</script>
