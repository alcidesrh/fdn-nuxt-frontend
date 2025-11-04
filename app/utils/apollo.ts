import type { FetchPolicy, OperationVariables } from '@apollo/client/core';
import { useChangeCase } from '@vueuse/integrations/useChangeCase';

import type { Collection } from '~/types/collection';
import * as gqlBuilder from 'gql-query-builder';
import gql from 'graphql-tag';
import { ar, en, fi } from '@formkit/i18n';
import type { EntityInterface } from '~/types/entity';
import { argsToArgsConfig } from 'graphql/type/definition';

export const apollo = {
	apolloClient() {
		return useNuxtApp().$apolloClient;
	},
	prepareQueryArguments(args: []) {
		let temp = [],
			operation,
			variables,
			fields = ['data'];
		if (Array.isArray(args)) {
			if (args.length > 1) {
				operation = args[0];
				fields = Array.isArray(args[1]) ? args[1] : [args[1]];
			} else if (Array.isArray(args[0])) {
				args[0].forEach((i) => {
					temp.push(this.prepareQueryArguments(i));
				});
				return temp;
			} else if (typeof args[0] === 'object') {
				({ operation, fields } = args[0]);
			}
		} else if (typeof args === 'object') {
			({ operation, fields } = args);
		}
		if (!variables) {
			variables = getQueryArgs(operation);
		}
		return { operation: operation, fields: fields, variables: variables };
	},

	q(
		params:
			| (Record<'operation', string> &
					Record<'variables', TVariables> &
					Record<'fields', [any]>)
			| Record<'policy', FetchPolicy>
			| any,
	) {
		try {
			let query;
			const { operation, fields, variables, policy = 'cache-first' } = params;
			if (operation && fields) {
				query = gqlBuilder.query({
					operation: operation,
					fields: fields,
					variables: getQueryArgs(operation),
				});
			} else {
				query = gqlBuilder.query(this.prepareQueryArguments([arguments[0]]));
			}
			query = gql`
				${query.query}
			`;
			// const { apolloClient } = useNuxtApp();
			return this.apolloClient().query({
				query,
				variables: variables || arguments[1] || [],
				fetchPolicy: policy,
			});
		} catch (e) {
			alert('e');
		}
	},
	c(entity: Ref<EntityInterface>, fetchPolicy = 'cache-first') {
		const queryBuild = gqlBuilder.query({
			operation: entity.value.collection.query,
			fields: entity.value.getColumnsFields(),
			variables: getQueryArgs(entity.value.collection.query),
		});
		const query: any = gql`
			${queryBuild.query}
		`;

		return this.apolloClient().query({
			query,
			variables: entity.value.collection.vars,
			fetchPolicy: fetchPolicy,
		});
	},
	query(
		params:
			| (Record<'operation', string> &
					Record<'variables', TVariables> &
					Record<'fields', [any]>)
			| Record<'poptions', FetchPolicy>
			| any,
	) {
		const queryBuild = gqlBuilder.query({
			...params,
			...{ variables: getQueryArgs(params.operation) },
		});
		const query: any = gql`
			${queryBuild.query}
		`;
		return this.apolloClient().query({
			query,
			variables: params.variables,
			fetchPolicy: params.poptions?.fetchPolicy || 'network-only',
		});
		// .catch((error) => {
		// });

		// const { result, loading, onError, refetch, fetchMore, onResult, variables } = useQuery(query, params.variables, params.poptions || {});
		// onError((e) => {
		//     gLoading.value = false;
		//     merror({ message: e });
		// });
		// return { result, loading, onResult, refetch, variables, fetchMore };
	},

	mutate(
		params: Record<'operation', string> &
			Record<'variables', VariablesParameter<OperationVariables | any>> &
			Record<'fields', any[]>,
	) {
		let operation, variables, fields;
		if (params.operation) {
			({ operation, variables, fields } = params);
		} else {
			operation = arguments[0];
			variables = arguments[1];
			fields = arguments[2];
		}
		const queryBuild = gqlBuilder.mutation({
			operation,
			variables: getMutationArgs(operation),
			fields,
		});
		const query: any = gql`
			${queryBuild.query}
		`;
		return this.apolloClient().mutate({
			mutation: query,
			variables: variables,
		});
	},

	remove(operation, vars, fields): any {
		const queryBuild = gqlBuilder.mutation({
			operation,
			fields: [fields], // parseFieldsGraphQl(fields),
			variables: getMutationArgs(operation),
		});

		const query: any = gql`
			${queryBuild.query}
		`;
		const { mutate, onDone, loading, onError } = useMutation(query);
		onError((e) => {
			merror({ message: e, life: false });
		});
		mutate({ input: vars });

		return {
			onDone,
			loading,
			onError,
		};
	},
};

function getQueryArgs(query: string) {
	if (typeof fdn.value.queries[query] != 'undefined') {
		return getArgs(fdn.value.queries[query]);
	}
}

function getMutationArgs(query: string) {
	if (typeof fdn.value.mutations[query] != 'undefined') {
		return getArgs(fdn.value.mutations[query]);
	} else {
		if (
			typeof fdn.value.mutations[useChangeCase(query, 'camelCase').value] !=
			'undefined'
		) {
			return getArgs(fdn.value.mutations[query]);
		}
	}
}
function getArgs(v: any) {
	const temp = {};
	v.args
		.filter((v) => !v.name.endsWith('_list'))
		.forEach((v) => {
			if (typeof v.type.ofType != 'undefined') {
				if (v.type.kind == 'LIST') {
					temp[v.name] = { type: `[${v.type.ofType.name}]` };
				} else if (v.type.kind == 'NON_NULL') {
					temp[v.name] = { type: `${v.type.ofType.name}!` };
				}
			} else {
				temp[v.name] = { type: v.type.name };
			}
		});
	return temp;
}
