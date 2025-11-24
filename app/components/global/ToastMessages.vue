<template>
	<Toast class="z-898 h-fit" position="top-center">
		<template #message="slotProps">
			<div class="p-toast-message-text" data-p="error" data-pc-section="messagetext">
				<div class="flex items-start gap-5">
					<!-- <i class="pi pi-exclamation-triangle mt-2px" /> -->
					<div class="grid">
						<span v-if="slotProps.message.summary" class="p-toast-summary u-mb-xs" data-p="error"
							data-pc-section="summary">
							<i :class="[icon]" class="absolute" style="font-size: 1rem"></i>
							<span class="ml-25px font-medium">{{ slotProps.message.summary }}</span>
						</span>
						<div v-if="slotProps.message.detail" class="flex items-center">
							<i v-if="!slotProps.message.summary" :class="[icon]" class="absolute" style="font-size: 1rem"></i>
							<div class="p-toast-detail font-normal ml-5px" data-p="error" data-pc-section="detail"
								v-html="slotProps.message.detail" />
						</div>

					</div>
				</div>

				<div v-if="slotProps.message.file" class="p-toast-detail flex gap-2 font-semibold u-my-2xs" data-p="error"
					data-pc-section="detail">
					<i class="pi pi-code" />

					<div>
						Archivo: {{ slotProps.message.file }}.
						<span v-if="slotProps.message.line">line: {{ slotProps.message.line }}</span>
					</div>
				</div>
			</div>
		</template>
	</Toast>

	<!-- </div> -->
</template>

<script setup lang="ts">
import type { ApolloErrorOptions } from "@apollo/client/errors";
import { useToast } from "primevue/usetoast";
import { createEditor } from "lexical";

const toast = useToast();
const bus = useEventBus("msg");
const error = useEventBus("error");
const type = ref('')

bus.on((msg: Record<'detail' | 'severity' | 'summary', string>) => {
	const lifetime = msg?.life === false ? {} : { life: 5000 }; // life: 5000

	type.value = msg?.severity || "success",
		toast.add({
			...lifetime,
			detail: msg?.detail || (util.isString(msg) ? msg : null),
			severity: type.value,
			summary: msg.summary || null
		});
});

error.on((e: any) => {
	let msg: any = {};

	try {
		// const { graphQLErrors, networkError } = e?.message as ApolloErrorOptions;

		// if (graphQLErrors?.length) {
		// 	msg = {
		// 		summary: graphQLErrors[0].message,
		// 		message: graphQLErrors[0]?.extensions?.debugMessage,
		// 		file: graphQLErrors[0]?.extensions?.file,
		// 		line: graphQLErrors[0]?.extensions?.line
		// 	};
		// } else if (networkError) {
		// 	msg = {
		// 		message: networkError?.cause || networkError.message,
		// 		summary: networkError?.cause ? networkError.message : null
		// 	};
		// } else {
		msg = e;
		// }
	} catch (err) {
		msg = err;
	}

	const lifetime = msg?.life === false ? {} : { life: 0 }; // life: 5000
	type.value = 'error'
	cl({
		...lifetime,
		...(typeof msg == "object" ? msg : { detail: msg }),
		severity: "error",
		summary: msg?.summary || msg || "Error:",
		file: msg?.file,
		line: msg?.line,
	})
	toast.add({
		...lifetime,
		...(typeof msg == "object" ? msg : { detail: msg }),
		severity: "error",
		summary: msg?.summary || msg || "Error:",
		file: msg?.file,
		line: msg?.line,
	});
});

const icon = computed(() => {

	if (type.value == 'error') {
		return 'pi pi-thumbs-down-fill text-red-500 '
	}
	else if (type.value == 'info') {
		return 'pi pi-info-circle  text-blue-500'
	}
	else if (type.value == 'success') {
		return 'pi pi-thumbs-up-fill text-emerald-500 '
	}

})
// const config = {
// 	namespace: "MyEditor"
// };

// const editor = createEditor(config);
// const contentEditableElement = document.getElementById("editor");

// editor.setRootElement(contentEditableElement);
</script>
<!-- <style scope>
#editor {
	border: 1px solid red;
	position: absolute;
	top: 50%;
	left: 50%;
	padding: 20px;
	size: 100px 700px;
}
</style> -->
