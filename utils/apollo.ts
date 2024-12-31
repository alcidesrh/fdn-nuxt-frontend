import { Collection } from './../composables/useCollection';
import { useQuery, useMutation } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { ApolloError } from '@apollo/client/errors';
import * as gqlBuilder from 'gql-query-builder';
import { OptionsParameter, VariablesParameter } from '@vue/apollo-composable/dist/useQuery.js';
import { OperationVariables } from '@apollo/client/core';

export const apollo = {
    // TResult = any, TVariables extends OperationVariables = OperationVariables
    query: (endpoint: string, vars: VariablesParameter<OperationVariables>, fields?: Record<string, any>, resource?: string | null, options?: OptionsParameter<any, OperationVariables>) => {
        const temp = parseVariablesGraphQl(vars, resource);
        // const fields2 = fields ? parseFieldsGraphQl(fields) : null;
        const queryBuild = gqlBuilder.query({
            operation: endpoint,
            fields: (fields as Array<string>) || ['data'],
            variables: temp
        });
        const query: any = gql`
            ${queryBuild.query}
        `;

        const { result, loading, onError, refetch, onResult, variables } = useQuery(query, queryBuild.variables, options || {});
        onError(merror);
        return { result, loading, onResult, refetch, variables };
    },
    collection: (collection: Ref<Collection>) => {
        return apollo.query(collection.value.query, collection.value.vars, collection.value.queryFields, collection.value.resource);
    },
    update: (name, args) => {
        const root = {
            mutation: {
                __name: name,
                __variables: args.types
            }
        };
        root.mutation[name] = {
            __args: args.signature,
            ...args.properties
        };
        const query = gql`
            ${jsonToGraphQLQuery(root)}
        `;
        const { mutate, onError, onDone, loading } = useMutation(query);
        onError((e) => merror({ message: e, life: false }));

        return {
            mutate,
            onDone,
            loading
        };
    },
    mutate: (endpoint: string, fields: any, vars: any, resource: any) => {
        const variables = parseVariablesGraphQl(vars, resource);
        let temp = gqlBuilder.mutation({
            operation: endpoint,
            fields: fields,
            variables: variables
        });
        log(fields, vars, temp, variables, resource);

        const mutation = gql`
            ${temp.query}
        `;
        const { mutate, onDone, loading, onError } = useMutation(mutation);
        onError((e) => merror({ message: e, life: false }));
        mutate(vars);

        return {
            onDone,
            loading,
            onError
        };
    },
    remove: (name, getValue = {}) => {
        const { mutate, onError, onDone, loading } = useMutation(query);
        onError((e) => merror({ message: e, life: false }));

        return {
            mutate,
            onDone,
            loading
        };
    },
    deleteMultiple: (name, fields = {}) => {
        const root = {
            mutation: {
                __name: name,
                __variables: {
                    input: `${name}Input!`
                }
            }
        };
        root.mutation[name] = {
            __args: {
                input: new VariableType('input')
            },
            ...fields
        };
        const query = gql`
            ${jsonToGraphQLQuery(root)}
        `;
        const { mutate, onError, onDone, loading } = useMutation(query);
        onError((e: ApolloError) => {
            merror({ message: e, life: false });
        });

        return {
            mutate,
            onDone,
            loading
        };
    }
};
