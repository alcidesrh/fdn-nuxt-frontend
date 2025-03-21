<template>
  <CrudForm :store="store" :arg="$route.params.id ? { username: $route.params.id } : null">
  </CrudForm>
</template>
<script setup lang="ts">

const store = useUserStore()

</script>
