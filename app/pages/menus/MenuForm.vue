<template>
	<div>
		<!-- <pre>
      {{ entity.item }}
    </pre> -->
		<CrudForm form-id="menuForm" :data="data" :store="store"
			:identifier="$route.params.id ? { id: g$route.params.id } : null" @submit="submit" />
	</div>
</template>

<script setup lang="ts">

const store = useMenuStore();
const actionStore = useActionStore();

const { entity, items } = storeToRefs(store);
store.getItems();
const { items: actions } = storeToRefs(actionStore);
actionStore.getItems();

const parent = computed(() =>
	items.value.filter(
		(v) =>
			entity.value.item.id != v.value &&
			(entity.value.item?.children
				? !entity.value.item?.children ||
				!entity.value.item?.children.includes(v.value)
				: true)
	)
);
const children = computed(() =>
	items.value.filter(
		(v) =>
			entity.value.item.id != v.value && v.value != entity.value.item.parent
	)
);

const data = ref({
	item: computed(() => entity.value.item),
	actions: computed(() => actions.value),
	parent: computed(() => parent.value),
	children: computed(() => children.value),
	twoColumnClass: 'flex flex-wrap  xl:justify-center gap-10',
	types: [
		{ label: 'Root', value: 'root' },
		{ label: 'Submenu', value: 'submenu_root' },
		{ label: 'Leaft', value: 'leaft' }
	],
	icon: computed(() => entity.value.item.icon)
});

// watch(() => entity.value.item, (v) => {

//   const temp = [{ header: 'Model', ...toRaw(entity.value.item) }, { header: 'Data', ...toRaw(unref(useCloned(data.value).cloned.value)) }, { header: 'Formulario', ...toRaw(store.schema) }]
//   const channel = new BroadcastChannel('app-data');
//   channel.postMessage(temp);

// }, { deep: true })
</script>
