import gql from 'graphql-tag';

export const taskType = gql`
  scalar DateTime

  type Task {
    _id: ID!
    description: String!
    isComplete: Boolean
    createdAt: DateTime
    isRPG: Boolean
    repeat: String
    level: Int
    experience: Int
    timeCompleted: Int
    timeGenerated: Int
    reset: DateTime
    selectedDays: [Int]
    selectedDate: DateTime
    section: Section
    user: User
    hasSubTask: Boolean
    expireDate: DateTime
    subtasks: [Subtask]
  }
`;
