import { useChangeCase } from '@vueuse/integrations/useChangeCase.mjs';
import { IntrospectionType } from 'graphql';
import { Mutation, Query } from '~/graphql/graphql';
import { Resource } from '~/types/utils';

type props = {
    name: string;
    fields: Array<Record<'name' | 'type' | 'reference', string | null | Array<Record<'name' | 'type', string>>>>;
};
type ApiResource = {
    MetadataResource: props;
    Agencia: props;
    User: props;
    Permiso: props;
    Localidad: props;
    Nacion: props;
    Asiento: props;
    Bus: props;
    Empresa: props;
    Piloto: props;
    Boleto: props;
    Cliente: props;
    BoletoLog: props;
    Salida: props;
    Recorrido: props;
    Parada: props;
    Enclave: props;
    SalidaLog: props;
    Estacion: props;
    FDN: props;
    Factura: props;
    Venta: props;
    Menu: props;
    Taxon: props;
    RecorridoAsientoPrecio: props;
    MultipleResource: props;
};

export const getCollectionQuery = (text) => useChangeCase(text, 'camelCase').value + 's';

export const fdn = ref({
    resources: {} as ReadonlyArray<IntrospectionType>,
    queries: {} as Query[],
    mutations: {} as Mutation[],
    payload: {} as any[],
    input: {} as any[],
    isEmpty: computed(() => Object.keys(fdn.value.resources).length == 0)
});
const getArgs = (v: any) => {
    const temp = {};
    v.args
        .filter((v) => !v.name.endsWith('_list'))
        .forEach((v) => {
            if (typeof v.type.ofType != 'undefined') {
                if (v.type.kind == 'LIST') {
                    temp[v.name] = { type: `[${v.type.ofType.name}]` };
                } else if (v.type.kind == 'NON_NULL') {
                    temp[v.name] = { type: v.type.ofType.name + '!' };
                }
            } else {
                temp[v.name] = { type: v.type.name };
            }
        });
    return temp;
};
export const getQueryArgs = (query: string) => {
    if (typeof fdn.value.queries[query] != undefined) {
        cl(query);
        return getArgs(fdn.value.queries[query]);
    }
};
export const getMutationArgs = (query: string) => {
    if (typeof fdn.value.mutations[query] != undefined) {
        return getArgs(fdn.value.mutations[query]);
    }
};
export const getFields = (resource) => {
    const r = fdn.value.resources[resource];

    return r;
};
