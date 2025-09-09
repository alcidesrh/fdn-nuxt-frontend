<template>
    <div>
        <!-- <Tree v-model:selectionKeys="selectedKey" :value="nodes" selectionMode="single" class="w-full md:w-[30rem]"></Tree>
 -->
        {{ entity.item }}
        <CrudForm :form-id="'actionForm'" :data="data" :store="store" :arg="$route.params.id ? { id: $route.params.id } : null"> </CrudForm>
    </div>
</template>
<script setup lang="ts">
import routes from '~/router.options';

const selectedKey = ref(null);

const nodes = ref(treeKey(routes.routes()));

const store = useActionStore();
const { entity, formkitSchema } = storeToRefs(store);
const data = ref({
    item: computed(() => entity.value.item),
    options: nodes.value
});
</script>
