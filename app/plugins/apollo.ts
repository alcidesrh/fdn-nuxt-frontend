import {
	ApolloClient,
	ApolloLink,
	HttpLink,
	InMemoryCache,
	ServerError,
} from '@apollo/client';
import {
	CombinedGraphQLErrors,
	CombinedProtocolErrors,
} from '@apollo/client/errors';
import { ErrorLink } from '@apollo/client/link/error';
import { map } from 'rxjs';
import { visit, Kind, BREAK } from 'graphql';

export default defineNuxtPlugin((nuxtApp) => {
	const httpLink = new HttpLink({
		uri: ENTRYPOINT_GRAPHQL,
	});
	const mutationFilterLink = new ApolloLink((operation, forward) => {
		if (operation.operationType == 'mutation') {
			const variables = operation.variables.input;
			Object.keys(variables).forEach((k) => {
				if (util.isObject(variables[k]) && !!variables[k]?.id) {
					operation.variables.input[k] = variables[k].id;
				} else if (util.isArray(variables[k])) {
					variables[k].forEach((v, i) => {
						if (util.isObject(v) && !!v?.id) {
							operation.variables.input[k][i] = v.id;
						}
					});
				}
			});
		}
		return forward(operation);
	});
	const globalLoadingLink = new ApolloLink((operation, forward) => {
		gloading.value = true;
		return forward(operation).pipe(
			map((result) => {
				gloading.value = false;
				return result;
			}),
		);
	});
	const authLink = new ApolloLink((operation, forward) => {
		const store = useUserSessionStore();
		operation.setContext({
			headers: {
				Authorization: `Bearer ${store.user.token}`,
			},
		});
		return forward(operation);
	});
	const errorLink = new ErrorLink(({ error, operation }) => {
		if (ServerError.is(error)) {
			if (error.statusCode == 401) {
				useUserSessionStore().clear();
				const router = useRouter();
				router.push({ name: 'Login' });
			} else if (error.statusCode == 500) {
				const { status, title, detail } = JSON.parse(error.bodyText);
				cl(status, title, detail);
				merror({
					summary: `Status code: ${status}. GraphQL ServerError from plugin/apollo.ts: ${title}`,
					detail: detail,
					// message: `GraphQL error from plugin/apollo.ts: ${message}, Location: ${locations}, Path: ${path}`,
				});
			} else {
				error.errors.forEach(({ message, locations, path }) =>
					console.log(
						`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
					),
				);
			}
		} else if (CombinedGraphQLErrors.is(error)) {
			error.errors.forEach(({ message, locations, path }) =>
				merror({
					summary: 'GraphQL error from plugin/apollo.ts',
					detail: message,
					// message: `GraphQL error from plugin/apollo.ts: ${message}, Location: ${locations}, Path: ${path}`,
				}),
			);
		} else if (CombinedProtocolErrors.is(error)) {
			error.errors.forEach(({ message, extensions }) =>
				alert(
					`[Protocol error]: Message: ${message}, Extensions: ${JSON.stringify(
						extensions,
					)}`,
				),
			);
		} else {
			alert('error in useApollo');

			console.error(`[Network error]: ${error}`);
		}
	});
	const apolloClient = new ApolloClient({
		link: ApolloLink.from([
			globalLoadingLink,
			mutationFilterLink,
			authLink,
			errorLink,
			httpLink,
		]),
		cache: new InMemoryCache(),
		defaultOptions: {
			watchQuery: {
				notifyOnNetworkStatusChange: false,
			},
		},
	});

	return {
		provide: {
			apolloClient,
		},
	};
});
