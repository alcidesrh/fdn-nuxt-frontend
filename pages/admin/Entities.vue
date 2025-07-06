<template>
    <div>
        <div class="entity-wrap" @click="toggleEntity = !toggleEntity"><Icon name="icon-park-outline:down" class="rotate" /><span>Entidades</span></div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 u-pl-s h-0px" :class="{ hidden: toggleEntity }">
            <div v-for="entity in entities" :key="entity">
                {{ str.chain(entity).snakeCase().replaceAll('_', ' ').titleCase() }}
            </div>
        </div>
        <!-- <Tree :value="list" class="w-full tree-entities">
            <template #default="slotProps">
                <b>{{ slotProps.node.label }}</b>
            </template>
            <template #url="slotProps">
                <a :href="slotProps.node.data">{{ slotProps.node.label }}</a>
            </template>
        </Tree> -->
    </div>
</template>

<script setup lang="ts">
const admin = useAdminStore();
admin.getEntities();
const { entities, toggleEntity } = storeToRefs(admin);
</script>
