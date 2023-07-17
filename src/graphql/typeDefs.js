import { userType } from '@/src/graphql/types/userType';
import { taskType } from '@/src/graphql/types/taskType';
import { subtaskType } from '@/src/graphql/types/subtaskType';
import { sectionType } from '@/src/graphql/types/sectionType';
import gql from 'graphql-tag';

export const typeDefs = gql`
  ${userType}
  ${taskType}
  ${sectionType}
  ${subtaskType}

  type Query {
    user(email: String!): User
    task(id: ID!): Task!
    tasks: [Task!]
    subtasks: [Subtask]
    sections: [Section!]
  }
`;
