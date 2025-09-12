// import { OptionsParameter, VariablesParameter } from '@vue/apollo-composable/dist/useQuery.js';
import type { FetchPolicy, OperationVariables } from '@apollo/client/core'
import type { Collection } from '~/types/collection'
import * as gqlBuilder from 'gql-query-builder'
import gql from 'graphql-tag'
// import { useQuery, useMutation } from '@vue/apollo-composable';
import { apolloClient } from '@/composables/useApollo'

export const apollo = {
  collection(
    collection: Ref<Collection>,
    fields: {}[],
    fetchPolicy = {},
  ) {
    const operation = collection.value.query
    const queryBuild = gqlBuilder.query({
      operation,
      fields: (fields as Array<{}>) || ['data'],
      variables: getQueryArgs(operation),
    })
    const query: any = gql`
      ${queryBuild.query}
    `
    return apolloClient.query({
      query,
      variables: collection.value.vars,
      // fetchPolicy: fetchPolicy || 'network-only'
    })
    const { result, onError, loading, onResult, variables } = useQuery(
      query,
      () => collection.value.vars,
      fetchPolicy,
    )
    onError((e) => {
      gLoading.value = false
      merror({ message: e })
    })
    return { result, loading, onResult, variables }
  },
  collectionAgnostic(resource: string) {
    return this.query({
      operation: 'collectionAgnostic',
      variables: { resource },
      poptions: { fetchPolicy: 'network-only' },
      fields: ['data'],
    })
  },
  query(
    params:
      | (Record<'operation', string>
        & Record<'variables', TVariables>
        & Record<'fields', [any]>)
      | Record<'poptions', FetchPolicy>
      | any,
  ) {
    const queryBuild = gqlBuilder.query({
      ...params,
      ...{ variables: getQueryArgs(params.operation) },
    })
    const query: any = gql`
      ${queryBuild.query}
    `
    return apolloClient.query({
      query,
      variables: params.variables,
      fetchPolicy: params.poptions?.fetchPolicy || 'network-only',
    })

    // const { result, loading, onError, refetch, fetchMore, onResult, variables } = useQuery(query, params.variables, params.poptions || {});
    // onError((e) => {
    //     gLoading.value = false;
    //     merror({ message: e });
    // });
    // return { result, loading, onResult, refetch, variables, fetchMore };
  },

  mutate(
    params: Record<'operation', string>
      & Record<'variables', VariablesParameter<OperationVariables | any>>
      & Record<'fields', any[]>,
  ) {
    const { operation, variables, fields } = params
    const queryBuild = gqlBuilder.mutation({
      operation,
      variables: getMutationArgs(params.operation),
      fields,
    })
    const query: any = gql`
      ${queryBuild.query}
    `
    return apolloClient.mutate({
      mutation: query,
      variables: params.variables,
    })
    const { mutate, onDone, loading, onError } = useMutation(query)
    onError((e) => {
      gLoading.value = false
      merror({ message: e, life: false })
    })
    return { mutate }
    // return mutate(variables);

    return {
      onDone,
      loading,
      onError,
    }
  },

  remove(operation, vars, fields): any {
    const queryBuild = gqlBuilder.mutation({
      operation,
      fields: [fields], // parseFieldsGraphQl(fields),
      variables: getMutationArgs(operation),
    })

    const query: any = gql`
      ${queryBuild.query}
    `
    const { mutate, onDone, loading, onError } = useMutation(query)
    onError((e) => {
      gLoading.value = false
      merror({ message: e, life: false })
    })
    mutate({ input: vars })

    return {
      onDone,
      loading,
      onError,
    }
  },
}

function getQueryArgs(query: string) {
  if (typeof fdn.value.queries[query] != 'undefined') {
    return getArgs(fdn.value.queries[query])
  }
}

function getMutationArgs(query: string) {
  if (typeof fdn.value.mutations[query] != undefined) {
    return getArgs(fdn.value.mutations[query])
  }
}
function getArgs(v: any) {
  const temp = {}
  v.args
    .filter(v => !v.name.endsWith('_list'))
    .forEach((v) => {
      if (typeof v.type.ofType != 'undefined') {
        if (v.type.kind == 'LIST') {
          temp[v.name] = { type: `[${v.type.ofType.name}]` }
        }
        else if (v.type.kind == 'NON_NULL') {
          temp[v.name] = { type: `${v.type.ofType.name}!` }
        }
      }
      else {
        temp[v.name] = { type: v.type.name }
      }
    })
  return temp
}
