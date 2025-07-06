import { useQuery, useMutation } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import * as gqlBuilder from 'gql-query-builder';
import { OptionsParameter, VariablesParameter } from '@vue/apollo-composable/dist/useQuery.js';
import { OperationVariables } from '@apollo/client/core';
import { Collection } from '~/types/collection';

export const apollo = {
    collection: function (collection: Ref<Collection>, fields: {}[], fetchPolicy = {}) {
        const operation = getCollectionQuery(collection.value.resource);
        const queryBuild = gqlBuilder.query({
            operation: operation,
            fields: (fields as Array<{}>) || ['data'],
            variables: getQueryArgs(operation)
        });
        const query: any = gql`
            ${queryBuild.query}
        `;

        const { result, onError, loading, onResult, variables } = useQuery(query, () => collection.value.vars, fetchPolicy);
        onError((e) => {
            gLoading.value = false;
            merror({ message: e });
        });
        return { result, loading, onResult, variables };
    },
    collectionAgnostic: function (resource: string) {
        return this.query({ operation: 'collectionAgnostic', variables: { resource: resource }, poptions: { fetchPolicy: 'network-only' }, fields: ['data'] });
    },
    query: function (params: (Record<'operation', string> & Record<'variables', VariablesParameter<OperationVariables>> & Record<'fields', [any]>) | Record<'poptions', OptionsParameter<any, OperationVariables>> | any) {
        const queryBuild = gqlBuilder.query({ ...params, ...{ variables: getQueryArgs(params.operation) } });
        const query: any = gql`
            ${queryBuild.query}
        `;
        const { result, loading, onError, refetch, fetchMore, onResult, variables } = useQuery(query, params.variables, params.poptions || {});
        onError((e) => {
            gLoading.value = false;
            merror({ message: e });
        });
        return { result, loading, onResult, refetch, variables, fetchMore };
    },

    mutate: function (params: Record<'operation', string> & Record<'variables', VariablesParameter<OperationVariables | any>> & Record<'fields', any[]>) {
        let { operation, variables, fields } = params;
        const queryBuild = gqlBuilder.mutation({
            operation: operation,
            variables: getMutationArgs(params.operation),
            fields: fields
        });
        const query: any = gql`
            ${queryBuild.query}
        `;

        const { mutate, onDone, loading, onError } = useMutation(query);
        onError((e) => {
            gLoading.value = false;
            merror({ message: e, life: false });
        });
        mutate(variables);

        return {
            onDone,
            loading,
            onError
        };
    },

    remove: function (operation, vars, fields): any {
        const queryBuild = gqlBuilder.mutation({
            operation: operation,
            fields: [fields], //parseFieldsGraphQl(fields),
            variables: getMutationArgs(operation)
        });

        const query: any = gql`
            ${queryBuild.query}
        `;
        const { mutate, onDone, loading, onError } = useMutation(query);
        onError((e) => {
            gLoading.value = false;
            merror({ message: e, life: false });
        });
        mutate({ input: vars });

        return {
            onDone,
            loading,
            onError
        };
    }
};
