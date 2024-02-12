<script setup lang="ts">
const online = useOnline()

const checked = ref(true);

const selectedValue = ref(null);
</script>

<template>
  <div>
    <div class="card flex justify-content-center">
      <InputSwitch v-model="checked" />
    </div>
    <Logos mb-6 />
    <Suspense>
      <!-- <PageView v-if="online" />
        <div v-else text-gray:80>
          You're offline
        </div> -->
      <template #fallback>
        <div italic op50>
          <span animate-pulse>Loading...</span>
        </div>
      </template>
    </Suspense>
    <InputEntry />
  </div>
</template>
