<script setup lang="ts">
import { FormKitSchema } from "@formkit/vue";
import schema from 'login_schema/login'
import type { Record } from "@icon-park/vue-next";

const store = useUserSessionStore()
const { user } = store

const { shake } = useAnimationGsap()

async function handleSubmit(credentials: Record<string, string>, node: Record<any, any>) {

  await $fetch('/login', {
    ...API_DEFAULT_OPTIONS,
    body: JSON.stringify(credentials),
  }).then((resp) => {

    const store = useUserSessionStore()
    store.user = resp
    navigateTo(store.redirectTo);
  }).catch(({ response: { _data } }) => {

    const error = _data.error || _data.detail || 'No se pudo iniciar la sesión'
    node.setErrors(
      [error]
    )
    shake('#login')
  })
  return;
}
const form = ref(null)
</script>

<template>
  <div class="relative z-999 m-auto max-w-fit ">
    <div id="login" class="border border-slate-4 p-3 bg-white text-slate-700 pt-8 rounded-0 shadow-md">
      <div class="w-fit md:w-25em">
        <div class="m-auto max-w-20em">
          <FormKit type="form" v-model="user" @submit-invalid="shake('#login')" @submit="handleSubmit" :actions="false"
            ref="form" message-class="">
            <FormKitSchema :schema="schema" :data="user" />
          </FormKit>
        </div>
      </div>
    </div>
  </div>
</template>
