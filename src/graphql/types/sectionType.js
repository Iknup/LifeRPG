import gql from 'graphql-tag';

export const sectionType = gql`
  type Section {
    _id: ID!
    title: String!
    tasks: [Task!]
  }
`;
