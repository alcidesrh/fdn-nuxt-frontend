<template>
    <div>
        <Drawer :modal="false" class="h-full overflow-y-auto" v-model:visible="visible" header="Admin&Config" position="right">
            <divider />
            <div>
                <Entities />
            </div>
        </Drawer>
        <div class="fixed-center-vertical text-slate-6 bg-slate-3">
            <Icon name="icon-park-outline:setting-two" @click="visible = true" mode="svg" />
        </div>
    </div>
</template>
<style src="~/assets/layout/admin/_drawer.css" />

<script setup lang="ts">
import Entities from './Entities.vue';
const visible = ref(false);
</script>

<style scoped></style>
