import { defineStore } from "pinia";
import type { Localidad } from "~/types/localidad";

export const useLocalidadStore = defineStore(
  "localidadStore",
  () => {
    return createStore<Localidad>("Localidad");
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
