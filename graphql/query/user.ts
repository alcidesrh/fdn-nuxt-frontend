import { gql } from '../index'

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
