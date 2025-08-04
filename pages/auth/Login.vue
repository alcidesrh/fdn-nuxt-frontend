<template>
    <div class="flex h-full items-center justify-center">
        <div id="login" :class="{ shake: shake }" class="u-px-l u-pt-xl u-pb-m rounded-xl bg-white text-slate-700 shadow-md">
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
<script setup lang="ts">
const store = useUserSessionStore();
const { user } = store;

const shake = ref(false);

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

const schema = [
    {
        $el: 'div',
        children: 'Iniciar Session',
        attrs: {
            class: 'u-text-3  text-slate-500  u-mb-l text-center',
            style: 'font-family: Faster One'
        }
    },
    {
        $formkit: 'texticon_primevue',
        name: 'username',
        label: 'Usuario',
        validation: 'required',
        labelClass: 'text-slate-500 u-mt-s u-mb-xs'
    },
    {
        $formkit: 'text_primevue',
        name: 'password',
        label: 'Contraseña',
        validation: 'required',
        labelClass: ' text-slate-500 u-mt-s u-mb-xs'
    },
    {
        $formkit: 'button_primevue',
        binds: {
            label: 'Aceptar',
            type: 'submit'
        },
        classes: {
            wrapper: 'flex justify-end u-mt-xl u-text-2'
        }
    }
];
</script>

<style scoped>
#login.shake {
    animation: shake 0.4s forwards;
}
@keyframes shake {
    0% {
        transform: translate(0px);
    }
    25% {
        transform: translate(30px);
    }
    50% {
        transform: translate(-30px);
    }
    75% {
        transform: translate(30px);
    }
    /* 80% {
        transform: translate(-30px);
    } */
    100% {
        transform: translate(0);
    }
}
</style>
