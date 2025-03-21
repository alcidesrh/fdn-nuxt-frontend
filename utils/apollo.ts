import { Collection } from './../composables/useCollection';
import { useQuery, useMutation } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { useChangeCase } from '@vueuse/integrations/useChangeCase';
import * as gqlBuilder from 'gql-query-builder';
import { OptionsParameter, VariablesParameter } from '@vue/apollo-composable/dist/useQuery.js';
import { OperationVariables } from '@apollo/client/core';

export const apollo = {
    queryParseArg: function (endpoint: string, vars: VariablesParameter<OperationVariables>, fields?: Record<string, any>, resource?: string | null, options?: OptionsParameter<any, OperationVariables>) {
        const temp = this.parseVariablesGraphQl(vars, resource);
        const queryBuild = gqlBuilder.query({
            operation: endpoint,
            fields: (fields as Array<string>) || ['data'],
            variables: temp
        });
        const query: any = gql`
            ${queryBuild.query}
        `;

        return {
            query: query,
            vars: queryBuild.variables,
            options: options || {}
        };
    },
    query: function (endpoint: string, pvars: VariablesParameter<OperationVariables>, fields?: Record<string, any>, resource?: string | null, poptions?: OptionsParameter<any, OperationVariables>) {
        const { query, vars, options } = this.queryParseArg(endpoint, pvars, fields, resource);
        const { result, loading, onError, refetch, fetchMore, onResult, variables } = useQuery(query, vars, options);

        onError((e) => {
            gLoading.value = false;
            merror({ message: e });
        });

        return { result, loading, onResult, refetch, variables, fetchMore };
    },
    collectionAgnostic: function (resource: string) {
        return this.query('collectionAgnostic', { resource: resource });
    },

    mutate: function (endpoint: string, fields: any, vars: any, resource?: any) {
        cl(endpoint, fields, vars);
        const queryBuild = gqlBuilder.mutation({
            operation: endpoint,
            fields: [fields], //parseFieldsGraphQl(fields),
            variables: this.parseVariablesGraphQl(vars, resource || endpoint)
        });
        const query: any = gql`
            ${queryBuild.query}
        `;

        const { mutate, onDone, loading, onError } = useMutation(query);
        onError((e) => {
            gLoading.value = false;
            merror({ message: e, life: false });
        });
        mutate(queryBuild.variables);

        return {
            onDone,
            loading,
            onError
        };
    },

    collection: function (collection: Collection, fetchPolicy = {}) {
        const names = collection.columns.map((i) => i.name);

        const fields = fdn.value.resourceFields(collection.resource).filter((i) => {
            return names.includes(typeof i == 'object' ? Object.keys(i)[0] : i);
        });
        const args = [{ collection: ['_id', ...fields] }, { paginationInfo: ['itemsPerPage', 'lastPage', 'totalCount', 'hasNextPage'] }];
        const temp = this.parseVariablesGraphQl(collection.vars, collection.resource) as any;
        if (temp.id) {
            temp.id = { type: 'Int', value: temp.id.value };
        }
        const queryBuild = gqlBuilder.query({
            operation: collection.query,
            fields: (args as Array<{}>) || ['data'],
            variables: temp
        });
        const query: any = gql`
            ${queryBuild.query}
        `;
        const { result, loading, onError, onResult, variables } = useQuery(query, collection.vars, fetchPolicy);

        onError((e) => {
            gLoading.value = false;
            merror({ message: e });
        });

        return { result, loading, onResult, variables };
    },

    parseVariablesGraphQl: function (vars: Record<string, any>, resource?: any): VariablesParameter<OperationVariables> {
        const temp = {};
        if (resource) {
            if (vars.id && typeof vars.id != 'undefined' && vars.id.toString().indexOf('/api/') == -1) {
                // vars.id = getIriFromId(vars.id, useChangeCase(resource, 'camelCase').value);
            }
            resource = /^[A-Z]/.test(resource) ? useChangeCase(resource, 'pascalCase').value : (resource = useChangeCase(resource, 'camelCase').value);
        }
        Object.keys(vars).forEach((i) => {
            let value = vars[i];
            if (i == 'id') {
                // temp[i] = { type: 'Int' };
                temp[i] = { type: 'ID!' };
                if (value) {
                    value = getIriFromId(value, resource);
                }
            } else if (['page', 'itemsPerPage'].includes(i)) {
                temp[i] = { type: 'Int' };
            } else if ('createdAt' == i && resource) {
                temp[i] = { type: `[${resource}Filter_createdAt]` };
            } else if ('order' == i && resource) {
                temp[i] = { type: `[${resource}Filter_order]` };
            } else if ('input' == i && resource) {
                temp[i] = { type: `${resource}Input!` };
            } else {
                temp[i] = { type: 'String' };
            }
            temp[i] = { ...temp[i], value: value };
        });
        return temp;
    }
};
