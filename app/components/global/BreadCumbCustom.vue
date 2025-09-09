<template>
    <div class="breadcrumb-wrap">
        <Breadcrumb :model="breadcrumb">
            <template #item="{ item, props }">
                <NuxtLink v-if="item.path" :to="item.path">
                    <div class="breadcrumb-item">
                        <div v-if="item.icon">
                            <Icon :name="item.icon" class="cursor-pointer" mode="svg" />
                        </div>
                        <span class="whitespace-nowrap capitalize">{{ item.label }}</span>
                    </div>
                </NuxtLink>
                <div v-else class="breadcrumb-item">
                    <div v-if="item.icon">
                        <Icon :name="item.icon" class="cursor-pointer" mode="svg" />
                    </div>
                    <span class="whitespace-nowrap capitalize">{{ item.label }}</span>
                </div>
            </template>

            <template #separator>
                <Icon name="icon-park-outline:right" mode="svg" />
            </template>
        </Breadcrumb>
    </div>
</template>
<script setup lang="ts">
const { breadcrumb } = useBreadcrumb();
</script>

<style scoped>
.breadcrumb-wrap {
    /* background-color: var(--p-surface-contrast-400); */
    z-index: 999;
    position: fixed;
    left: calc(var(--sidebar-small-width) + 1rem);
    height: var(--topbar);
    display: flex;
    align-items: center;
    position: relative;
}
.p-breadcrumb-separator > svg {
    color: var(--p-surface-contrast-600);
    font-size: 1rem !important;
}
.breadcrumb-item {
    display: flex;
    gap: 5px;
    border-radius: 8px;
    align-items: center;
    padding: 0px 1px;
    font-size: 1rem;
    font-weight: 500;
    color: var(--p-surface-contrast-600);
    & > div > svg {
        font-size: 18px !important;
        & > * {
            stroke-width: 3;
        }
    }
    &:hover {
        color: var(--p-surface-contrast-700);
    }
}
</style>
