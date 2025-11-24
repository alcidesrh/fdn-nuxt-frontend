<template>
	<div class="h-full w-full @container">
		<div v-if="schema.length" class="form-wrapper" :class="{ 'opacity-50': qloading || mloading }">
			<FormKit type="form" @submit="store.submit" v-model="defaultValue" :actions="false">
				<FormKitSchema :schema="schema" :data="data" :library="library">
					<template #header>
						<slot name="left-header" :user="entity.item">
							<span class="surface-contrast-600 font-semibold u-text-2">{{
								entity.item?.id ? 'Editar ' : 'Nuevo ' }}
								{{ entity.name }}</span>
						</slot>
					</template>
					<template #crudBtn>
						<div class="flex flex-wrap justify-end gap-5 align-middle">
							<slot name="CrudButton">

								<CrudButton :edit="!!entity.item?.id" @delete="store.remove()" @cancel="
									$router.push({
										name: entity.endpoints.list
									})
									" />
							</slot>
						</div>
					</template>
				</FormKitSchema>
			</FormKit>
		</div>
		<div v-else class="w-full opacity-[0.5]">
			<div class="right-2rem h-fit w-full flex justify-end gap-5 @4xl:justify-end @2xl:justify-center">
				<SkeletonButton :columns="columns" class="" />
			</div>
			<div class="flex justify-center gap-4">
				<SkeletonForm :columns="2" :rows="10" />
				<!-- <SkeletonForm />
                <SkeletonForm /> -->
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import type { Store } from 'pinia';
import { FormKitMessages } from '@formkit/vue';
import { markRaw } from 'vue'

interface Props {
	store: Store;
	id?: any;
	columns?: number;
	data?: any;
	formId?: string;
	identifier?: string | object
}
const { columns = 3, store, identifier, data } = defineProps<Props>();
const library = markRaw({
	FormKitMessages: FormKitMessages
})

const { schema, entity } = storeToRefs(store) as any;
store.setFormkitSchema(identifier);

const defaultValue = ref({})
watch(() => entity.value.item, (v) => {
	defaultValue.value = v
})

// onBeforeMount(() => {
// 	const eventSource = new EventSource(
// 		'http://localhost/.well-known/mercure?topic=form'
// 	);

// 	eventSource.onmessage = (event) => {
// 		schema2.value = [JSON.parse(event.data).schema];
// 	};

// 	const eventSource2 = new EventSource(
// 		'http://localhost/.well-known/mercure?topic=item'
// 	);

// 	eventSource.onmessage = (event) => {
// 		schema2.value = [JSON.parse(event.data).schema];
// 	}; });
</script>
