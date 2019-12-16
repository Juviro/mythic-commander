import gql from 'graphql-tag'

export const getUser = gql`
  query getUser {
    user {
      id
      name
      avatar
    }
  }
`

export const login = gql`
  mutation login($token: String!) {
    login(token: $token) {
      session
    }
  }
`
