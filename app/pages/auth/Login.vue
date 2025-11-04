<script setup lang="ts">

import { FormKitMessages } from '@formkit/vue';
import type { FetchError } from 'ofetch';
const store = useUserSessionStore();


const data = ref();
async function handleSubmit(
	credentials: Record<string, string>,
	node: Record<any, any>
) {

	await useApiRest('/login', {
		body: JSON.stringify(credentials),
		async onResponse({ response: { _data, status } }) {
			if (status == 200) {
				const store = useUserSessionStore();
				store.user = _data;
				user.value = _data as User;
				await useMetadataStore().setApiMetadata();

				navigateTo(store.redirectTo)

			}
		}
	}).catch((error: FetchError) => {
		cle(error.data)
	});
	// .then(async (resp) => {

	// if (status.value != 200) {
	// 	const headers = useRequestHeader('authorization')
	// }


	// const store = useUserSessionStore();

	// store.setUserSessswion(ds)
	// const store = useUserSessionStore();
	// store.user = resp;
	// user.value = resp as User;
	// await useMetadataStore().setApiMetadata();
	// navigateTo(store.redirectTo);

	// })
	// 	catch(response => {
	// 	alert(23);
	// 	let error =
	// 		_data.error || _data.detail || 'No se pudo iniciar la sesión';
	// 	if (error === 'Invalid credentials.') {
	// 		error = 'Usuario o contraseña incorrectos';
	// 	}
	// 	node.setErrors([error]);
	// })
	// .finally(() => { });

	// await $fetch('/login', {
	// 	...API_DEFAULT_OPTIONS,
	// 	body: JSON.stringify(credentials)
	// })
	// 	.then(async (resp) => {
	// 		const store = useUserSessionStore();
	// 		store.setUserSession(resp)
	// 		// store.user = resp;
	// 		user.value = store.user as User;
	// 		const metadata = useMetadataStore();
	// 		await metadata.setApiMetadata();
	// 		navigateTo(store.redirectTo);
	// 	})
	// 	.catch(({ response: { _data } }) => {
	// 		let error =
	// 			_data.error || _data.detail || 'No se pudo iniciar la sesión';
	// 		if (error === 'Invalid credentials.') {
	// 			error = 'Usuario o contraseña incorrectos';
	// 		}
	// 		node.setErrors([error]);
	// 	});
}
const form = useTemplateRef('login');
function shake(id) {
	form.value.classList.add('animate__shakeX');
}
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
		$formkit: 'text_primevue',
		name: 'username',
		label: 'Usuario',
		validation: 'required',
		labelClass: 'text-slate-500 u-mt-s u-mb-xs'
	},
	{
		$formkit: 'password_primevue',
		name: 'password',
		label: 'Contraseña',
		password: true,
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
function removeAnimation() {
	form.value.classList.remove('animate__shakeX');
}
onMounted(() => {
	form.value.addEventListener('animationend', removeAnimation);
});
onBeforeUnmount(() => {
	form.value.removeEventListener('animationend', removeAnimation);
});
</script>
<template>
	<div class="h-full flex items-center justify-center">
		<div id="login" ref="login"
			class="animate__animated animate__faster rounded-xl bg-white text-slate-700 shadow-md u-p-m u-px-l">
			<div class="w-fit md:w-25em">
				<div class="m-auto max-w-20em">
					<FormKit v-model="data" type="form" :actions="false" message-class="" @submit-invalid="shake('#login')"
						@submit="handleSubmit">
						<FormKitSchema :schema="schema" :data="data" />
						<FormKitMessages />
					</FormKit>
				</div>
			</div>
		</div>
	</div>
</template>


<style scoped>
.animate__animated {
	will-change: transform;
}
</style>
