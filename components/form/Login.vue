<script setup lang="ts">
import { FormKitSchema } from "@formkit/vue";
import { ref } from "vue";
import schema from 'schema/login'

const user = ref<User>({});

async function handleSubmit(credentials: User, node) {
  // try {
  await useUserLogin(credentials).catch(({ response: { _data: { error } } }) => {
    node.setErrors(
      // Arg 1 is form-wide errors
      [error],
    )

  });
  return;
}

</script>

<template>
  <div class="relative top-80% z-90 py-5 m-auto max-w-fit ">
    <div class="border border-slate-400 p-3 bg-white/75 pt-8 rounded rounded-4 shadow-md">
      <div class="w-fit md:w-25em">
        <div class="m-auto max-w-20em">
          <FormKit type="form" v-model="user" @submit="handleSubmit" :actions="false">
            <FormKitSchema :schema="schema" :data="user" />
          </FormKit>
        </div>
      </div>
    </div>
  </div>
</template>

