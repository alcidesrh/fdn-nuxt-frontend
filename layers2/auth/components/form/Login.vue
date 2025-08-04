<script setup lang="ts">
// import { FormKitSchema } from "@formkit/vue";
import schema from '~/layers2/auth/components/form/schemas/login';
import type { Record } from '@icon-park/vue-next';

const store = useUserSessionStore();
const { user } = store;

const { shake } = useAnimationGsap();

async function handleSubmit(credentials: Record<string, string>, node: Record<any, any>) {
    await $fetch('/login', {
        ...API_DEFAULT_OPTIONS,
        body: JSON.stringify(credentials)
    })
        .then((resp) => {
            const store = useUserSessionStore();
            store.user = resp;
            navigateTo(store.redirectTo);
        })
        .catch(({ response: { _data } }) => {
            const error = _data.error || _data.detail || 'No se pudo iniciar la sesión';
            node.setErrors([error]);
            shake('#login');
        });
    return;
}
const form = ref(null);
</script>

<template>
    <div class="z-999 relative m-auto max-w-fit">
        <div id="login" class="border-slate-4 u-px-l u-pt-xl u-pb-m rounded-xl border bg-white text-slate-700 shadow-md">
            <div class="md:w-25em w-fit">
                <div class="max-w-20em m-auto">
                    <FormKit type="form" v-model="user" @submit-invalid="shake('#login')" @submit="handleSubmit" :actions="false" ref="form" message-class="">
                        <FormKitSchema :schema="schema" :data="user" />
                    </FormKit>
                </div>
            </div>
        </div>
    </div>
</template>
