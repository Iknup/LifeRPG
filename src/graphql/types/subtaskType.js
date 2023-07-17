import gql from 'graphql-tag';

export const subtaskType = gql`
  scalar DateTime

  type Subtask {
    _id: ID!
    title: String!
    isComplete: Boolean
    createdAt: DateTime
    repeat: Boolean
    parentTask: Task
  }
`;
