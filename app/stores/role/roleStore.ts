import { defineStore } from "pinia";
import type { Role } from "~/types/role";

export const useRoleStore = defineStore(
  "roleStore",
  () => {
    const {
      collection,
      formkitSchema,
      setFormkitSchema,
      remove,
      removeMultiple,
      resource,
      items,
      getItems,
      entity,
      iniCollection,
      sortCollection,
      submit,
    } = createStore<Role>("Role");

    const options = [];

    return {
      collection,
      formkitSchema,
      submit,
      resource,
      remove,
      removeMultiple,
      setFormkitSchema,
      items,
      getItems,
      entity,
      iniCollection,
      sortCollection,
      options,
    };
  }
  // {
  //     persist: {
  //         afterHydrate: (ctx) => {
  //             console.log(`just hydrated '${ctx.store.$id}'`);
  //         },
  //         beforeHydrate: (ctx) => {
  //             console.log(`about to hydrate '${ctx.store.$id}'`);
  //         }
  //     }
  // }
);
