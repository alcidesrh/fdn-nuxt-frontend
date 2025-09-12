<script setup lang="ts">
const store = useUserStore()
const { entity } = storeToRefs(store)

const localidadStore = useLocalidadStore()
const { items } = storeToRefs(localidadStore)
localidadStore.getItems()
const roleStore = useRoleStore()
const { items: roles } = storeToRefs(roleStore)
roleStore.getItems()
const permisoStore = usePermisoStore()
const { items: permisos } = storeToRefs(permisoStore)
permisoStore.getItems()

const data = ref({
  localidades: items,
  roles,
  permisos,
  item: computed(() => entity.value.item),
  submit: () => store.submit(),
})

watch(
  () => entity.value.item,
  (v) => {
    // cl(v, data.value);
  },
)

function submit() {
  // const { onDone, loading } =

  return apollo
    .mutate({
      operation: entity.value.getMutationOperation(),
      variables: { input: Entity.prepareVariables(entity.value.item) },
      fields: entity.value.getMutationFields(),
    })
    .then((data) => {
      gLoading.value = false
      entity.value.item = data[entity.value.name]
      msg.emit(getAlertText('update'))
      // reload();
      // const router = useRouter();
      // router.push({ name: entity.value.routes.list });
    })
    .catch((e) => {
      gLoading.value = false
      merror({ message: e, life: false })
    })
  // const { mutate } = apollo.mutate({ operation: entity.value.getMutationOperation(), variables: { input: Entity.prepareVariables(entity.value.item) }, fields: entity.value.getMutationFields() });
  gLoading.value = true
  return mutate({ input: Entity.prepareVariables(entity.value.item) })
    .then((data) => {
      gLoading.value = false
      entity.value.item = data[entity.value.name]
      msg.emit(getAlertText('update'))
      // reload();
      // const router = useRouter();
      // router.push({ name: entity.value.routes.list });
    })
    .catch((e) => {
      gLoading.value = false
      merror({ message: e, life: false })
    })
  // return new Promise((r) => {
  return onDone(
    () =>
      new Promise(() => {
        msg.emit(getAlertText('update'))
      }),
  )
  // });
  // return onDone((data) => {
  //     msg.emit(getAlertText('update'));
  //     // reload();
  //     // const router = useRouter();
  //     // router.push({ name: entity.value.routes.list });
  // });
}
</script>

<template>
  <CrudForm
    :data="data"
    :store="store"
    :arg="$route.params.id ? { username: $route.params.id } : null"
  >
    <template #left-header="{ user }">
      <span
        class="hint--right hint--error hint--bounce u-text-1 font-medium"
      >Mi cuenta</span>
    </template>
    <template #CrudButton>
      <div class="u-mb-m flex flex-wrap justify-end gap-5 align-middle">
        <div
          class="right-2rem @2xl:justify-center @4xl:justify-end @4xl:w-fit flex h-fit w-full justify-end gap-5"
        >
          <Button
            type="submit"
            severity="primary"
            label="Guardar"
            icon="pi pi-save"
          />
        </div>
      </div>
    </template>

    <template #localidad="{ schema }">
      <FormKitSchema :schema="schema" :data="data" />
    </template>
  </CrudForm>
</template>
