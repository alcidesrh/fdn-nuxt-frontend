import { getIntrospectionQuery } from 'graphql/utilities/index.js';
import { useChangeCase } from '@vueuse/integrations/useChangeCase';
import fetchQuery from './fetchQuery.js';
import { Field as CustomField } from '~/graphql/parse/src';
import { Resource } from './Resource.js';
import { Query } from './Query.js';
import { Mutation } from './Mutation.js';

const removeEmptyObjectsByKeys = (object: any, excludeValues: string[] = ['_id', '__typename', 'description', 'interfaces']): {} => {
    if (Array.isArray(object)) {
        return;
    }
    let newObject = {};
    Object.keys(object).forEach((key) => {
        if (object[key] && !excludeValues.includes(key)) {
            if (Array.isArray(object[key])) {
                const temp: {}[] = [];
                object[key].forEach((v) => temp.push(removeEmptyObjectsByKeys(v)));
                newObject[key] = temp;
            } else if (typeof object[key] === 'object') {
                newObject[key] = removeEmptyObjectsByKeys(object[key]);
            } else {
                newObject[key] = object[key];
            }
        }
    });
    return newObject;
};
interface test {
    id: string;
    _id: number;
}
export class Entity<Type> {
    name: string;
    camelCase: string;
    fields: CustomField[];
    columns: CustomField[];
    item: Type & test;
    payload: {};
    input: {};
    excludeFields: string[];
    routes: Record<'list' | 'create' | 'edit', string>;
    endpoints: Record<('get' | 'create' | 'update' | 'delete') | 'form', string>;
    constructor(name: string) {
        this.name = name;
        this.camelCase = useChangeCase(name, 'camelCase').value;
        this.fields = fdn.value.resources[name].fields;
        this.excludeFields = [];
        this.columns = [];
        this.item = {};
        this.payload = this.input = {};
        ['create', 'update', 'delete'].forEach((v) => {
            const temp = `${v + name}Payload`,
                temp2 = `${v + name}Input`;
            this.payload[temp] = fdn.value.payload[temp];
            this.input[temp2] = fdn.value.input[temp2];
        });
        const camelCase: string = useChangeCase(name, 'camelCase').value;
        this.routes = {
            list: `${camelCase}_list`,
            create: `${camelCase}_create`,
            edit: `${camelCase}_edit`
        };
        const pascalCase = useChangeCase(name, 'pascalCase').value;
        this.endpoints = { get: camelCase, form: 'getFormResource' };
        ['create', 'update', 'delete'].forEach((v) => (this.endpoints[v] = v + pascalCase));
    }
    setColumns(fields: []) {
        this.columns = this.fields.filter((v) => fields.includes(v.name));
    }
    getColumnsFields(): {}[] {
        const aux = this.columns.map((v: any) => Entity.prepareField(v));
        return [{ collection: ['_id', ...aux] }, { paginationInfo: ['itemsPerPage', 'lastPage', 'totalCount', 'hasNextPage'] }];
    }
    getQueryFields() {
        const fields = Object.keys(this.item);
        return this.fields.filter((v) => !this.excludeFields.includes(v.name) && (!fields.length || fields.includes(v.name) || ['id', '_id'].includes(v.name))).map((v) => Entity.prepareField(v));
    }
    getMutationFields() {
        const mutateInfo = fdn.value.mutations[this.getCrudOperation()];
        const root: any = {};
        root[fdn.value.payload[mutateInfo.type.name].fields.find((v) => v.name != 'clientMutationId').name] = this.getQueryFields();

        return [root]; //root[fdn.value.payload[mutateInfo.type.name].fields.find((v) => v.name != 'clientMutationId').name];
    }
    getIriFromId(id): string {
        return `/api/${this.name.toLowerCase()}s/${id}`;
    }
    getCrudOperation(operation = null): string {
        const pascalCase = useChangeCase(this.name, 'pascalCase').value;
        return this.item.id ? `update${pascalCase}` : `create${pascalCase}`;

        // get: camelCase,
        // collection: 'collection' + camelCase + 's',
        // create: `create${pascalCase}`,
        // update: `update${pascalCase}`,
        // delete: `delete${pascalCase}`,
        // form: `getFormResource`
    }
    static prepareField(v: any) {
        if (v.type.kind == 'SCALAR' || v.type.kind == 'ENUM' || (v?.type.kind == 'NON_NULL' && v.type?.ofType?.kind == 'SCALAR')) {
            return v.name;
        } else if (v.type.kind == 'OBJECT' && v.type.name) {
            const temp = {};
            if (v.type.name.endsWith('PageConnection')) {
                const r = fdn.value.resources[v.type.name].fields.find((v) => v.type.kind == 'LIST').type.ofType.name;
                temp[v.name] = [{ collection: fdn.value.resources[r].fields.filter((v) => ['id', 'nombre'].includes(v.name)).map((v) => v.name) }];
            } else if (v.type.name.endsWith('CursorConnection')) {
                const r = fdn.value.resources[v.type.name].fields.find((v) => v.name == 'edges').type.ofType.name;
                const r2 = fdn.value.resources[r].fields.find((v) => v.name == 'node').type.name;
                temp[v.name] = [{ edges: [{ node: fdn.value.resources[r2].fields.filter((v) => ['id', 'nombre'].includes(ofType.name)).map((v) => v.name) }] }];
            } else {
                cl(fdn.value.resources[v.type.name].fields.map((v) => v.name));
                temp[v.name] = fdn.value.resources[v.type.name].fields.map((v) => v.name);
                // temp[v.name] = ['id', 'nombre'];
            }
            return temp;
        } else if (v.type.kind == 'LIST') {
            let temp = {};
            if (v.type.ofType.kind == 'OBJECT') {
                temp[v.name] = fdn.value.resources[v.type.ofType.name].fields.map((v) => v.name);
            }
            return temp;
        }
    }

    static prepareVariables(object: {}, excludeValues: string[] = ['_id', '__typename']) {
        if (typeof object == 'string') {
            return !excludeValues.includes(object) ? object : null;
        }
        let newObject = {};
        Object.keys(object).forEach((key) => {
            if (object[key]) {
                if (Array.isArray(object[key])) {
                    const temp: {}[] = [];
                    let temp2;
                    object[key].forEach((v) => {
                        temp2 = Entity.prepareVariables(v);
                        if (temp2) {
                            temp.push(temp2);
                        }
                    });
                    newObject[key] = temp;
                } else if (typeof object[key] === 'object') {
                    if (object[key].id) {
                        newObject[key] = object[key].id;
                    } else {
                        newObject[key] = Entity.prepareVariables(object[key]);
                    }
                } else {
                    if (!excludeValues.includes(key)) {
                        newObject[key] = object[key];
                    }
                }
            }
        });

        return newObject;
    }
}
export default async (
    entrypointUrl: string,
    options: RequestInit = {}
): Promise<{
    resources: Resource[];
    queries: Query[];
    mutations: Mutation[];
    payload: any[];
    input: any[];
    // api: Api;
    // response: Response;
}> => {
    const introspectionQuery = getIntrospectionQuery();

    const {
        response,
        body: { data }
    } = await fetchQuery<IntrospectionQuery>(entrypointUrl, introspectionQuery, options);
    if (!data?.__schema) {
        throw new Error('Schema has not been retrieved from the introspection query.');
    }
    const schema = data?.__schema;
    const resources: Resource[] = [];
    const queries: Query[] = [];
    const mutations: Mutation[] = [];
    const input: any[] = [];
    const payload: any[] = [];

    schema.types.forEach((typeResource) => {
        if (
            (typeResource.kind === 'OBJECT' || typeResource.kind === 'INPUT_OBJECT') &&
            // type.name !== schema.queryType.name &&
            // type.name !== schema.mutationType?.name &&
            typeResource.name !== schema.subscriptionType?.name &&
            !typeResource.name.startsWith('__')
            // mutation
            // !typeResource.name.startsWith(typeResource.name[0].toLowerCase())
            // !typeResource.name.endsWith('Connection') &&
            // !typeResource.name.endsWith('Edge') &&
            // !typeResource.name.endsWith('PageInfo') &&
            // !typeResource.name.endsWith('PaginationInfo')
        ) {
            if (typeResource.name.endsWith('Payload')) {
                payload[typeResource.name] = removeEmptyObjectsByKeys(typeResource);
            } else if (typeResource.kind === 'INPUT_OBJECT') {
                input[typeResource.name] = removeEmptyObjectsByKeys(typeResource);
            } else if (typeResource.name == schema.queryType.name) {
                typeResource.fields.forEach((v) => {
                    queries[v.name] = removeEmptyObjectsByKeys(v);
                });
            } else if (typeResource.name == schema.mutationType?.name) {
                typeResource.fields.forEach((v) => {
                    mutations[v.name] = removeEmptyObjectsByKeys(v);
                });
            } else {
                resources[typeResource.name] = removeEmptyObjectsByKeys(typeResource);
            }
        }
    });
    return {
        resources: resources,
        queries: queries,
        mutations: mutations,
        payload: payload,
        input: input
    };
    // return {
    //     api: new Api(entrypointUrl, { resources }),
    //     response
    // };
};
