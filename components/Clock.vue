<template>
    <div id="clock">
        <div>
            <div class="time">
                <span>{{ time }}</span>
                <span class="text-14px w-15px ml-5px inline-block">{{ seconds }}</span>
                <span class="ml-5px">{{ ampm }}</span>
            </div>
            <div class="date">{{ date }}</div>
        </div>
        <!-- <div class=""> -->
        <NuxtLink :to="{ name: 'inicio' }" class="layout-topbar-logo-container">
            <div class="logo-fdn">FDN</div>
        </NuxtLink>
        <!-- </div> -->
    </div>

    <!-- <p class="text">DIGITAL CLOCK with Vue.js</p> -->
</template>

<script setup lang="ts">
let date: Ref = ref(),
    time: Ref = ref(),
    ampm: Ref = ref(),
    seconds: Ref = ref();

function updateDate() {
    date.value = ref(useDateFormat(new Date(), 'dddd DD/MM/YYYY', { locales: 'es-Es' }).value);
    time.value = ref(useDateFormat(new Date(), 'hh:mm', { locales: 'es-Es' }).value);
    ampm.value = ref(useDateFormat(new Date(), 'a', { locales: 'es-Es' }).value);
}
updateDate();
useIntervalFn(() => {
    seconds.value = useDateFormat(new Date(), 'ss', { locales: 'es-Es' }).value;
    if (seconds.value == '00') {
        updateDate();
    }
}, 1000);
</script>
<style scoped>
#clock {
    z-index: 999;
    position: fixed;
    /* overflow: hidden; */
    left: 50%;
    top: 0;
    margin-left: -140px;
    width: 280px;
    height: var(--topbar);

    display: flex;
    justify-content: center;
    align-items: center;
    & > div {
        margin: auto;
        font-weight: 700;
        font-size: 1.2rem;
        color: var(--p-surface-contrast-700);
        z-index: 20;

        &:nth-child(1) {
            /* width: 280px; */
            /* height: var(--topbar); */
            /* background-color: --alpha(var(--p-surface-contrast-0) / 0%); */
            /* backdrop-filter: blur(1px); */
            color: var(--p-surface-contrast-500);
        }
        & > .time {
            padding: 5px 10px 0 10px;
            text-align: center;
            letter-spacing: 0.15em;
            /* color: var(--p-surface-contrast-500); */

            & > span:nth-child(1) {
                display: inline-block;
                text-align: right;
            }
            & > span:nth-child(2) {
                margin-right: 5px;
            }
        }
        & > .date {
            text-align: center;
            padding: 0 10px 5px 10px;
            letter-spacing: 0.15em;
            text-transform: capitalize;
            font-size: 0.8rem;
            font-family: monospace;
        }
    }
    & > .layout-topbar-logo-container {
        z-index: 10;
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: -10px;
        & > .logo-fdn {
            width: 100% !important;
            font-size: 95px;
            font-weight: 100;
            letter-spacing: 10px;
            font-family: 'Faster One', system-ui;
            color: --alpha(var(--p-zinc-200) / 80%);
            color: var(--p-surface-contrast-200);
        }
    }
}
</style>
