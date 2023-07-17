import gql from 'graphql-tag';

export const userType = gql`
  type User {
    _id: ID!
    email: String!
    name: String!
    sections: [Section!]
    tasks: [Task!]
  }
  input AddUserInput {
    email: String!
    name: String!
  }

  type Mutation {
    addUser(addUserInput: AddUserInput): User
    deleteUser(id: ID!): Boolean
  }
`;
