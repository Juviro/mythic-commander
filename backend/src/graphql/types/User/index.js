export default `
  type User {
    id: String!
    name: String!
    avatar: String!
    email: String!
  }

  type Query {
    user: User!
  }
`
