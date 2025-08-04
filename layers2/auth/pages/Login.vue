<script setup>
import { computed } from 'vue';

definePageMeta({
    layout: false,
    path: '/login'
});
const allow_banner_amimation = computed(() => !window.matchMedia('(max-width: 1000px)').matches);
</script>
<template>
    <div class="layout-wrapper z-10">
        <div class="layout-topbar left-0 top-0 text-slate-800 shadow">
            <!-- <HeaderAnimation v-if="allow_banner_amimation" /> -->
        </div>
        <div class="layout-sidebar z-1 h-full">
            <Skeleton class="mb-2" />
            <Skeleton width="10rem" class="mb-2" />
            <Skeleton width="5rem" class="mb-2" />
            <Skeleton height="2rem" class="mb-2" />
            <Skeleton width="10rem" height="4rem" />
            <Skeleton class="mb-2" />
            <Skeleton width="10rem" class="mb-2" />
            <Skeleton width="5rem" class="mb-2" />
            <Skeleton height="2rem" class="mb-2" />
            <Skeleton width="10rem" height="4rem" />
            <ul class="layout-menu">
                <li class="menu-option mb-2 mt-3" />
            </ul>
        </div>

        <div class="layout-main-container h-full">
            <div class="layout-main">
                <div class="overlay z-2 left-0" />
                <div class="overlay2 right-0 z-0" />
                <div class="top-50% -mt-211px absolute m-auto w-full">
                    <FormLogin />
                </div>

                <div class="card">
                    <div class="border-round border-1 surface-border surface-card p-4">
                        <div class="mb-3 flex">
                            <Skeleton shape="circle" size="4rem" class="mr-2"></Skeleton>
                            <div>
                                <Skeleton width="10rem" class="mb-2"></Skeleton>
                                <Skeleton width="5rem" class="mb-2"></Skeleton>
                                <Skeleton height=".5rem"></Skeleton>
                            </div>
                        </div>
                        <Skeleton width="100%" height="150px"></Skeleton>
                        <div class="justify-content-between mt-3 flex">
                            <Skeleton width="4rem" height="2rem"></Skeleton>
                            <Skeleton width="4rem" height="2rem"></Skeleton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style></style>
