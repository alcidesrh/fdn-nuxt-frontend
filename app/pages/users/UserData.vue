<template>
	<CrudForm v-if="showForm" :class="{ 'opacity-5': gloading }" :data="data" :store="store"
		:id="$route.params.id ? { username: $route.params.id } : null">
		<template #left-header="{ user }">
			<span class="hint--right hint--error hint--bounce font-medium u-text-1">Mi cuenta</span>

			<pre>
						{{ data.item }}
					</pre>
		</template>
		<template #CrudButton>
			<div class="flex flex-wrap justify-end gap-5 align-middle u-mb-m">
				<div class="right-2rem h-fit w-full flex justify-end gap-5 @4xl:w-fit @4xl:justify-end @2xl:justify-center">
					<Button type="submit" severity="primary" label="Guardar" icon="pi pi-save" />
				</div>
			</div>
		</template>

		<template #localidad="{ schema }">
			<FormKitSchema :schema="schema" :data="data" />
		</template>
		<template #roles="{ schema }">
			<FormKitSchema :schema="schema" :data="data" />
		</template>

	</CrudForm>

</template>

<script setup lang="ts">
import * as gqlBuilder from 'gql-query-builder';
import gql from 'graphql-tag';

const store = useUserStore();
const api = useMetadataStore()
const { entity } = storeToRefs(store);

const localidadStore = useLocalidadStore();
const { items } = storeToRefs(localidadStore);
localidadStore.getItems();

const roleStore = useRoleStore();
const { items: roles } = storeToRefs(roleStore);
roleStore.getItems();

const permisoStore = usePermisoStore();
const { items: permisos } = storeToRefs(permisoStore);
permisoStore.getItems();
const data = ref()
onBeforeMount(() => {
	data.value = {
		localidades: items,
		roles: computed(() => roles.value),
		permisos: computed(() => permisos.value),
		item: computed(() => entity.value.item),
		submit: (data) => store.submit(data)
	};

})
const route = useRoute()
const showForm = computed(() => data.value?.roles.length && data?.value.permisos.length && route.params.id)

function submit(data) {
	// const { onDone, loading } =
	return apollo
		.mutate({
			operation: entity.value.getMutationOperation(),
			variables: { input: Entity.prepareVariables(entity.value.item) },
			fields: entity.value.getMutationFields()
		})
		.then(data => {
			entity.value.item = data[entity.value.name];
			msg.emit(getAlertText("update"));
			// reload();
			// const router = useRouter();
			// router.push({ name: entity.value.routes.list });
		})
		.catch(e => {
			merror({ message: e, life: false });
		});
	// const { mutate } = apollo.mutate({ operation: entity.value.getMutationOperation(), variables: { input: Entity.prepareVariables(entity.value.item) }, fields: entity.value.getMutationFields() });
	return mutate({ input: Entity.prepareVariables(entity.value.item) })
		.then(data => {
			entity.value.item = data[entity.value.name];
			msg.emit(getAlertText("update"));
			// reload();
			// const router = useRouter();
			// router.push({ name: entity.value.routes.list });
		})
		.catch(e => {
			merror({ message: e, life: false });
		});

}
</script>
