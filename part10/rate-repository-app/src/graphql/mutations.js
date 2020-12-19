import { gql } from 'apollo-boost';

export const AUTHORIZE_USER = gql`
mutation authorizeUser(
    $username: String!,
    $password: String!,
) {
  authorize(credentials: {
    username: $username,
    password: $password
  }) {
    accessToken
  }
}
`;

export const CREATE_USER = gql`
mutation createNewUser(
    $username: String!,
    $password: String!,
) {
  createUser(user: {
    username: $username,
    password: $password
  }) {
    id
    username
  }
}
`;