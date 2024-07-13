import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'
import { DefaultApolloClient } from '@vue/apollo-composable'

export default defineNuxtPlugin((nuxtApp) => {
  const cache = new InMemoryCache()

  const apolloClient = new ApolloClient({
    cache,
    uri: 'http://localhost/graphql',
  })

  const apolloProvider = createApolloProvider({
    defaultClient: apolloClient,
  })

  nuxtApp.vueApp.use(apolloProvider)
  nuxtApp.vueApp.provide(DefaultApolloClient, apolloClient)
})
