import { Ref } from 'vue';
type props = {
    name: string;
    fields: Array<Record<'name' | 'type' | 'reference', string | null | Array<Record<'name' | 'type', string>>>>;
};
type Resource = {
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
// export const fdn: Ref<Resource> | null = ref({} as Resource);

export const fdn = ref({
    api: {} as any,
    resourceFields: function (key, exclude = ['label'] as Array<string>) {
        if (typeof this.api[key] == undefined) {
            throw new Error('No existe el recurso' + key);
        }
        return this.api[key].fields
            .filter((i: Record<'name', string>) => !exclude.includes(i.name))
            .map((i) => {
                if (['String', 'ID', 'Iterable', 'Int', 'Status'].includes(i.type)) {
                    return i.name;
                } else if (i.reference) {
                    const temp = {};
                    temp[i.name] = ['id', 'nombre'];
                    return temp;
                } else {
                    const temp = {};
                    temp[i.name] = [{ collection: ['id', 'nombre'] }];
                    return temp;
                }
                // else {
                // }
            });
    },
    parse: function (fields) {
        const temp: Array<any> = [];
        let temp2 = {};

        Object.keys(fields).forEach((i) => {
            if (Array.isArray(fields[i])) {
                temp2[i] = fields[i];
                temp.push(temp2);
                temp2 = {};
            } else if (fields[i] instanceof Object) {
                temp2[i] = this.parseFieldsGraphQl(fields[i]);
                temp.push(temp2);
                temp2 = {};
            } else {
                temp.push(i);
            }
        });
        return temp;
    },
    parseFieldsGraphQl: function (fields: any) {
        const temp: Array<any> = [];
        let temp2 = {};

        Object.keys(fields).forEach((i) => {
            if (Array.isArray(fields[i])) {
                temp2[i] = fields[i];
                temp.push(temp2);
                temp2 = {};
            } else if (fields[i] instanceof Object) {
                temp2[i] = parseFieldsGraphQl(fields[i]);
                temp.push(temp2);
                temp2 = {};
            } else {
                temp.push(i);
            }
        });
        return temp;
    }
});
