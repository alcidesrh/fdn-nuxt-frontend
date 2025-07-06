<template>
    <div>
        <Drawer v-model:visible="visible" header="Admin&Config" position="right">
            <Entities />
        </Drawer>
        <div class="fixed-center-vertical text-slate-6 bg-slate-3">
            <Icon name="icon-park-outline:setting-two" @click="visible = true" mode="svg" />
        </div>
    </div>
</template>
<style module src="~/assets/admin.css"></style>

<script setup lang="ts">
import Entities from './Entities.vue';
const visible = ref(false);
</script>

<style scoped></style>
