<script setup lang="ts">
import { FormKitSchema } from "@formkit/vue";
import { ref } from "vue";

import schema from 'schema/login'

const user = ref<User>({});

async function handleSubmit(credentials: User) {

  const { error } = useUserLogin(credentials)
  // if (!response.ok) {
  //   const data = await response.json();
  //   console.log(data);
  //   // TODO: set error
  //   return;
  // }
}

</script>

<template>
  <div class="relative top-80% z-90 py-5 m-auto max-w-fit ">
    <div class="border border-slate-400 p-3 bg-white/75 pt-8 rounded rounded-4 shadow-md">
      <FormKit type="form" v-model="user" @submit="handleSubmit" :actions="false">
        <div class="w-fit md:w-25em">
          <div class="m-auto max-w-20em">
            <FormKitSchema :schema="schema" :data="user" />
          </div>
        </div>
      </FormKit>
    </div>
  </div>
  <pre>
{{ data }}
</pre>
</template>
