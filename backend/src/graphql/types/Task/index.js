export default `
  type Task {
    _id: String!
    description: String!
    interval: String!
    lastDone: String
    completed: [Completed!]!
  }
  
  type Completed {
    timestamp: String!
    user: User!
  }

  type User {
    _id: ID!
    name: String!
  }

  type Query {
    task(_id: ID!): Task!
    tasks: [Task!]!
  }

  type CompleteTaskReturn {
    _id: String!
    user: User
  }

  type Mutation {
    createTask(task: CreateTaskInput): Task!
    updateTask(_id: ID!, task: UpdateTaskInput!): Task
    completeTask(_id: ID!, user: ID!): CompleteTaskReturn
    deleteTask(_id: ID!): Task
  }

  input CreateTaskInput {
    description: String!
    interval: String!
    lastDone: Int
  }
  
  input UpdateTaskInput {
    description: String
    interval: String
    lastDone: Int
  } 
`;
