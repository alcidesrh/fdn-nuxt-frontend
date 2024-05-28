import { gql } from '~/graphql/'

export const userCollection = gql(`
  query getUsers($first: Int!) {
    users(first: $first) {
      edges {
        node {
          nombre
        }
      }
    }    
  }
`)
