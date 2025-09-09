<template>
    <div>
        <collection-list :store="store" :field="'username'"></collection-list>
    </div>
</template>
<script setup lang="ts">
const store = useUserStore();
</script>
