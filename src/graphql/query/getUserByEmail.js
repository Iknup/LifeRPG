import gql from 'graphql-tag';

export const GET_USER_BY_EMAIL = gql`
  query GetUserByEmail($email: String!) {
    user(email: $email) {
      _id
      email
      name
      sections {
        _id
        title
      }
    }
  }
`;
