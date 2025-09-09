<template>
    <div class="flex h-full items-center justify-center">
        <div
            id="login"
            ref="login"
            class="animate__animated animate__faster u-px-l u-pt-xl u-pb-m rounded-xl bg-white text-slate-700 shadow-md"
        >
            <div class="md:w-25em w-fit">
                <div class="max-w-20em m-auto">
                    <FormKit
                        type="form"
                        v-model="data"
                        @submit-invalid="shake('#login')"
                        @submit="handleSubmit"
                        :actions="false"
                        message-class=""
                    >
                        <FormKitSchema :schema="schema" :data="data" />
                        <FormKitMessages />
                    </FormKit>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { FormKitMessages } from "@formkit/vue";
const data = ref();
async function handleSubmit(
    credentials: Record<string, string>,
    node: Record<any, any>
) {
    node.clearErrors();
    await $fetch("/login", {
        ...API_DEFAULT_OPTIONS,
        body: JSON.stringify(credentials),
    })
        .then((resp) => {
            const store = useUserSessionStore();
            store.user = resp;
            user.value = store.user as User;
            navigateTo(store.redirectTo);
        })
        .catch(({ response: { _data } }) => {
            let error =
                _data.error || _data.detail || "No se pudo iniciar la sesión";
            if (error === "Invalid credentials.") {
                error = "Usuario o contraseña incorrectos";
            }
            node.setErrors([error]);
        });
    return;
}
const form = useTemplateRef("login");
function shake(id) {
    form.value.classList.add("animate__shakeX");
}
const schema = [
    {
        $el: "div",
        children: "Iniciar Session",
        attrs: {
            class: "u-text-3  text-slate-500  u-mb-l text-center",
            style: "font-family: Faster One",
        },
    },
    {
        $formkit: "text_primevue",
        name: "username",
        label: "Usuario",
        validation: "required",
        labelClass: "text-slate-500 u-mt-s u-mb-xs",
    },
    {
        $formkit: "password_primevue",
        name: "password",
        label: "Contraseña",
        password: true,
        validation: "required",
        labelClass: " text-slate-500 u-mt-s u-mb-xs",
    },
    {
        $formkit: "button_primevue",
        binds: {
            label: "Aceptar",
            type: "submit",
        },
        classes: {
            wrapper: "flex justify-end u-mt-xl u-text-2",
        },
    },
];
function removeAnimation() {
    form.value.classList.remove("animate__shakeX");
}
onMounted(() => {
    form.value.addEventListener("animationend", removeAnimation);
});
onBeforeUnmount(() => {
    form.value.removeEventListener("animationend", removeAnimation);
});
</script>

<style scoped>
.animate__animated {
    will-change: transform;
}
</style>
