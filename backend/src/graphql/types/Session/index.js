export default `
  type Session {
    userId: String!
    sessionId: String!
    expires: String
  }

  type LoginResponse {
    session: String!
  }

  type Mutation {
    login(token: String): LoginResponse!
    logout: Boolean
  }
`;
