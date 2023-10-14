import { gql } from 'graphql-request'

export const GET_PRODUCTS = gql`
  query GET_PRODUCTS{
    Products{
      id
      name
    }
  }
`
