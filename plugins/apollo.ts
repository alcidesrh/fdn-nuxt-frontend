import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core';
import { createApolloProvider } from '@vue/apollo-option';
import { provideApolloClient, DefaultApolloClient } from '@vue/apollo-composable';
const httpLink = new HttpLink({
    // You should use an absolute URL here
    uri: 'http://localhost/graphql'
});

// Create the apollo client
const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    connectToDevTools: true
});

const apolloProvider = provideApolloClient(apolloClient);

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.provide(DefaultApolloClient, apolloClient);
});
