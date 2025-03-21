import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core';
import { provideApolloClient, DefaultApolloClient } from '@vue/apollo-composable';
const httpLink = new HttpLink({
    // You should use an absolute URL here
    uri: ENTRYPOINT_GRAPHQL
});

// Create the apollo client
const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    connectToDevTools: true
});

export default defineNuxtPlugin((nuxtApp) => {
    provideApolloClient(apolloClient);

    // nuxtApp.vueApp.provide(DefaultApolloClient, apolloClient);
});
