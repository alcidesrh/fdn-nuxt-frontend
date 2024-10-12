<script setup lang="ts">

import { appName } from '~/constants'

useHead({
  title: appName,
})

// const online = useOnline()

</script>

<template>
  <!-- <VitePwaManifest /> -->
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage :transition="{
      name: 'bounce',
      mode: 'out-in'
    }" />
  </NuxtLayout>
</template>
