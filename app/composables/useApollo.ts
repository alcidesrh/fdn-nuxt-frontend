// import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core';

import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  concat,
  from,
  gql,
} from "@apollo/client";
// import { ApolloProvider } from '@apollo/client/react';
// import { provideApolloClient, DefaultApolloClient } from '@vue/apollo-composable';
import { ErrorLink } from "@apollo/client/link/error";
import {
  CombinedGraphQLErrors,
  CombinedProtocolErrors,
  ServerError,
} from "@apollo/client/errors";

// Log any GraphQL errors, protocol errors, or network error that occurred
// const errorLink = new ErrorLink(({ error, operation }) => {
// if (ServerError.is(error)) {
//     error.errors.forEach(({ message, locations, path }) => console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`));
// }
// else if (CombinedProtocolErrors.is(error)) {
//     error.errors.forEach(({ message, extensions }) => console.log(`[Protocol error]: Message: ${message}, Extensions: ${JSON.stringify(extensions)}`));
// } else {
//     console.error(`[Network error]: ${error}`);
// }
// });

const httpLink = new HttpLink({
  uri: "http://localhost/graphql", //ENTRYPOINT_GRAPHQL
  // headers: {
  //     Authorization: `Bearer fdn_be1f5822c20326f313c39af741846b1d4644076d2010ac6d56aa6be9e5f76294`
  // }
});

const authMiddleware = new ApolloLink((operation, forward) => {
  const token =
    "fdn_be1f5822c20326f313c39af741846b1d4644076d2010ac6d56aa6be9e5f76294";
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  });
  // operation.setContext(({ headers = {} }) => ({
  //     headers: {
  //         ...headers,
  //         authorization: 'Bearer fdn_be1f5822sc20326f313c39af741846b1d4644076d2010ac6d56aa6be9e5f76294' //localStorage.getItem('token') || null
  //     }
  // }));
  return forward(operation);
});

// Log any GraphQL errors, protocol errors, or network error that occurred
const errorLink = new ErrorLink(({ error, operation }) => {
  if (CombinedGraphQLErrors.is(error)) {
    error.errors.forEach(
      ({ message, locations, path }) =>
        merror({
          message: `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        })
      //   alert(
      //     `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      //   )
    );
  } else if (CombinedProtocolErrors.is(error)) {
    error.errors.forEach(({ message, extensions }) =>
      alert(
        `[Protocol error]: Message: ${message}, Extensions: ${JSON.stringify(
          extensions
        )}`
      )
    );
  } else {
    console.error(`[Network error]: ${error}`);
  }
});

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: ApolloLink.from([authMiddleware, errorLink, httpLink]),
  cache: new InMemoryCache(),

  // onError: ({ graphQLErrors, networkError, operation, forward }) => {
  //     if (graphQLErrors) {
  //         for (let err of graphQLErrors) {
  //             // handle errors differently based on its error code
  //             switch (err.extensions.code) {
  //                 case 'UNAUTHENTICATED':
  //                     // old token has expired throwing AuthenticationError,
  //                     // one way to handle is to obtain a new token and
  //                     // add it to the operation context
  //                     const headers = operation.getContext().headers;
  //                     operation.setContext({
  //                         headers: {
  //                             ...headers,
  //                             authorization: getNewToken()
  //                         }
  //                     });
  //                     // Now, pass the modified operation to the next link
  //                     // in the chain. This effectively intercepts the old
  //                     // failed request, and retries it with a new token
  //                     return forward(operation);

  //                 // handle other errors
  //                 case 'ANOTHER_ERROR_CODE':
  //                 // ...
  //             }
  //         }
  //     }
  // }
});
