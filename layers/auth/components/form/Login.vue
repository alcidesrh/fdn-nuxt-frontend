<script setup lang="ts">
import { FormKitSchema } from "@formkit/vue";
import schema from 'login_schema/login'
import type { Record } from "@icon-park/vue-next";

const store = useUserSessionStore()
const { user } = store

const { shake } = useAnimationGsap()

async function handleSubmit(credentials: Record<string, string>, node: Record<any, any>) {

  await useFetch('/login', {

    ...API_DEFAULT_OPTIONS,
    body: {
      username: credentials.username,
      password: credentials.email
    },
    onResponseError({ response: { _data: { error } } }) {
      console.log(error);
      node.setErrors(
        [error]
      )
      throw new Error(error);
    },
    onResponse(response) {
      console.log(response);

    }
  })
  // .then(async (resp) => {
  //   alert(11)
  //   if ((resp as Record<string, string>).uri) {
  //     store.setUserSession(resp)
  //     const { user } = store
  //     console.log(resp, user);
  //   }
  // }).catch((resp) => {
  //   console.log(resp._data.error);
  //   // return
  //   node.setErrors(
  //     // Arg 1 is form-wide errors
  //     [resp._data.error],
  //   )

  //   shake('#login')
  // });
  // await useUserLogin(credentials)
  //   .then(async (resp) => {

  //     if ((resp as Record<string, string>).uri) {
  //       store.setUserSession(resp)
  //       const { user } = store
  //       console.log(resp, user);
  //     }
  //   })
  //   .catch((resp) => {
  //     console.log(resp, user);
  //     // return
  //     node.setErrors(
  //       // Arg 1 is form-wide errors
  //       [error],
  //     )

  //     shake('#login')
  //   });
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

