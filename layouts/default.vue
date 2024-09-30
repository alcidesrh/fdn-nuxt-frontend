<template>
    <div class="layout-wrapper">

        <!-- <div class=" preloader-content z-999 fixed top-50% left-50%"></div> -->
        <div id="intersectionObservertarget" class="absolute top-2rem"></div>
        <Topbar />
        <Sidebar />
        <div id="layout-content" class="layout-content" :class="[menuStore.mode]">
            <div class="layout-content-slot">
                <NuxtPage />
            </div>
        </div>

        <div class="layout-mask animate-fadein" />
        <div>
            <toast-messages />
        </div>
    </div>
    <!-- <Toast /> -->
</template>
<script setup>
import Topbar from './Topbar.vue'
import Sidebar from './Sidebar.vue'
import { DomHandler } from '../utils/primevueutils/Utils.js'

const menuStore = useMenuStateStore()
const route = useRoute()

watch(() => route, () => {
    menuStore.setMode('normal');
    DomHandler.unblockBodyScroll('blocked-scroll');
    // this.$toast.removeAllGroups(); 
})

function onMenuButtonClick() {

    menuStore.setMode('active')
    if (menuStore.mode != 'active') {
        DomHandler.unblockBodyScroll('blocked-scroll');
    } else {
        DomHandler.blockBodyScroll('blocked-scroll');
    }
}


</script>
