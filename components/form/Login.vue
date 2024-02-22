<script setup lang="ts">
import { FormKitSchema } from "@formkit/vue";
import { ref } from "vue";
import schema from 'schema/login'
import type { Record } from "@icon-park/vue-next";

const user = ref<User>({});
const { shake } = useAnimationGsap()

async function handleSubmit(credentials: User, node) {
  // try {
  await useUserLogin(credentials)
    .then(async (resp: unknown | Record<any, any>) => {

      if (resp.uri) {
        const localForage = useLocalForage()
        await localForage.setItem('user', resp)
      }



    })
    .catch((resp) => {

      console.log(resp, 222222222222222);
      return


      node.setErrors(
        // Arg 1 is form-wide errors
        [error],
      )

      shake('#login')
    });
  return;
}

</script>

<template>
  <div class="relative top-80% z-999 py-5 m-auto max-w-fit ">
    <div id="login" class="border border-slate-400 p-3 bg-white pt-8 rounded shadow-md">
      <div class="w-fit md:w-25em">
        <div class="m-auto max-w-20em">
          <FormKit type="form" v-model="user" @submit-invalid="shake('#login')" @submit="handleSubmit" :actions="false">
            <FormKitSchema :schema="schema" :data="user" />
          </FormKit>
        </div>
      </div>
    </div>
  </div>
</template>

