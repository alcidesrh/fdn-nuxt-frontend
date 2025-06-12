import { User as u } from '~/types/user';
import { Menu as m } from '~/types/menu';
import type { IntrospectionObjectType, IntrospectionOutputTypeRef } from 'graphql/utilities';
import { Resource, Field } from '@api-platform/api-doc-parser';
import { apimetadata } from '~/types/types';
import { extend } from 'dayjs';

function getRangeFromGraphQlType(type: IntrospectionOutputTypeRef): string {
    if (type.kind === 'NON_NULL') {
        if (type.ofType.kind === 'LIST') {
            return `Array<${getRangeFromGraphQlType(type.ofType.ofType)}>`;
        }

        return type.ofType.name;
    }

    if (type.kind === 'LIST') {
        return `Array<${getRangeFromGraphQlType(type.ofType)}>`;
    }

    return type.name;
}

function getReferenceFromGraphQlType(type: IntrospectionOutputTypeRef): null | string {
    if (type.kind === 'OBJECT' && type.name.endsWith('Connection')) {
        return type.name.slice(0, type.name.lastIndexOf('Connection'));
    }

    return null;
}

export interface ResourceOptions {
    excludeFormBase: Array<string>;
    name: string;
    fields: Array<Record<string, string>>;
    collectionFields: never[];
}
class ResourceBase implements ResourceOptions {
    // excludeFormBase: Array<string>;
    // name: string;
    // fields: Array<Record<string, string>>;
    // collectionFields: Array<string>;
    constructor(
        public name: string,
        public fields: [],
        public excludeFormBase = ['label', 'createdAt', 'updatedAt', '_id'],
        public collectionFields = []
    ) {
        // this.excludeFormBase = ['label', 'id', '_id'];
        this.fields = fields;
        this.name = name;
        // this.collectionFields = [];
        // assignSealed(this, options);
    }
}
class Resource extends ResourceBase {
    excludeForm: Array<string>;

    constructor(name: string, fields: any) {
        super(name, fields);
        this.excludeForm = [];
    }

    get fieldsCrud() {
        return this.fields.filter((v: any) => ![...this.excludeFormBase, ...this.excludeForm].includes(v.name)); // [...this.excludeFormBase, ...this.excludeForm];
    }
}

function getFields(resources) {
    const apiObject = {};
    resources.forEach((element, i) => {
        if (element.name.endsWith('PaginationInfo')) {
            return;
        }

        try {
            const fields = element.fields.map((i: Record<string, string>) => {
                return {
                    name: i.name,
                    type: i.range,
                    reference: i.reference
                        ? i.reference.fields.map((i) => {
                              return {
                                  name: i.name,
                                  type: i.range
                              };
                          })
                        : null
                };
            });
            apiObject[element.name] = new Resource(element.name, fields);
        } catch (error) {
            console.log(error);
        }
    });
    return apiObject;
}

export function getApiResources(data?) {
    // cl(data);
    if (data) {
        return getFields(data.resources);
    }

    const schema = data || apimetadata?.__schema;
    const typeResources = schema.types.filter(
        (type) =>
            type.kind === 'OBJECT' &&
            type.name !== schema.queryType.name &&
            type.name !== schema.mutationType?.name &&
            type.name !== schema.subscriptionType?.name &&
            !type.name.startsWith('__') &&
            // mutation
            !type.name.startsWith(type.name[0].toLowerCase()) &&
            !type.name.endsWith('Connection') &&
            !type.name.endsWith('Edge') &&
            !type.name.endsWith('PageInfo')
    ) as IntrospectionObjectType[];

    const resources: Resource[] = [];
    typeResources.forEach((typeResource) => {
        const fields: Field[] = [];
        const readableFields: Field[] = [];
        const writableFields: Field[] = [];
        typeResource.fields.forEach((resourceFieldType) => {
            const field = new Field(resourceFieldType.name, {
                range: getRangeFromGraphQlType(resourceFieldType.type),
                reference: getReferenceFromGraphQlType(resourceFieldType.type),
                required: resourceFieldType.type.kind === 'NON_NULL',
                description: resourceFieldType.description,
                deprecated: resourceFieldType.isDeprecated
            });

            fields.push(field);
            readableFields.push(field);
            writableFields.push(field);
        });

        resources.push(new Resource(typeResource.name, fields));
        // resources.push(
        //     new Resource(typeResource.name, '', {
        //         fields,
        //         readableFields,
        //         writableFields
        //     })
        // );
    });
    return getFields(resources);
}

export interface User extends u {}
export interface Menu extends m {}
