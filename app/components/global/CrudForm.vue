<template>
	<div class="h-full w-full @container">
		<div v-if="formkitSchema.length" class="grid">
			<div class="fdn-form-header">
				<div class="grid w-full items-start @md:flex @md:justify-between">
					<slot name="left-header" :user="entity.item">
						<span aria-label="yeeee"
							class="hint--right hint--error hint--bounce surface-contrast-600 font-semibold u-text-2">{{
								entity.item?.id ? 'Editar ' : 'Nuevo ' }}
							{{ entity.name }}</span>
					</slot>

					<div class="flex items-end justify-end u-mt-l @md:mt-0">
						<slot name="right-header">
						</slot>
					</div>
				</div>
			</div>

			<div class="form-wrapper">
				<FormKitSchema :schema="formkitSchema" :data="data">
					<template #crudBtn>
						<slot name="CrudButton">
							<div class="flex flex-wrap justify-end gap-5 align-middle u-mb-m">
								<CrudButton :edit="!!entity.item?.id" @delete="store.remove()" @cancel="
									$router.push({
										name: entity.endpoints.list
									})
									" />
							</div>
						</slot>
					</template>
				</FormKitSchema>
			</div>
		</div>
		<div v-else class="w-full opacity-[0.5]">
			<div class="right-2rem h-fit w-full flex justify-end gap-5 @4xl:justify-end @2xl:justify-center">
				<SkeletonButton :columns="columns" class="" />
			</div>
			<div class="row-float-left">
				<SkeletonForm :columns="3" :rows="10" />
				<!-- <SkeletonForm />
                <SkeletonForm /> -->
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { Store } from 'pinia';

interface Props {
	store: Store;
	id?: any;
	columns?: number;
	data?: any;
	formId?: string;
}id
const { columns = 3, store, id, data } = defineProps<Props>();

const { formkitSchema, entity } = storeToRefs(store) as any;
store.setFormkitSchema(id);

// onBeforeMount(() => {
// 	const eventSource = new EventSource(
// 		'http://localhost/.well-known/mercure?topic=form'
// 	);

// 	eventSource.onmessage = (event) => {
// 		formkitSchema2.value = [JSON.parse(event.data).schema];
// 	};

// 	const eventSource2 = new EventSource(
// 		'http://localhost/.well-known/mercure?topic=item'
// 	);

// 	eventSource.onmessage = (event) => {
// 		formkitSchema2.value = [JSON.parse(event.data).schema];
// 	}; });
</script>
