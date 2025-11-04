<template>
	<Toast class="z-999 h-fit" position="top-center">
		<template #message="slotProps">
			<div class="p-toast-message-text" data-p="error" data-pc-section="messagetext">
				<div class="flex items-start gap-5">
					<!-- <i class="pi pi-exclamation-triangle mt-2px" /> -->
					<div class="grid">
						<span v-if="slotProps.message.summary" class="p-toast-summary u-mb-xs" data-p="error"
							data-pc-section="summary">{{ slotProps.message.summary }}</span>
						<div v-if="slotProps.message.detail" class="p-toast-detail font-normal" data-p="error"
							data-pc-section="detail" v-html="slotProps.message.detail" />
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
bus.on((msg: Record<'detail' | 'severity' | 'summary', string>) => {
	const lifetime = msg?.life === false ? {} : { life: 5000 }; // life: 5000
	toast.add({
		...lifetime,
		detail: msg?.detail || "",
		severity: msg?.severity || "success",
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
	toast.add({
		...lifetime,
		...(typeof msg == "object" ? msg : { detail: msg }),
		severity: "error",
		summary: msg?.summary || msg || "Error:",
		file: msg?.file,
		line: msg?.line
	});
});

const config = {
	namespace: "MyEditor"
};

const editor = createEditor(config);
const contentEditableElement = document.getElementById("editor");

editor.setRootElement(contentEditableElement);
</script>
<style scope>
#editor {
	border: 1px solid red;
	position: absolute;
	top: 50%;
	left: 50%;
	padding: 20px;
	size: 100px 700px;
}
</style>
