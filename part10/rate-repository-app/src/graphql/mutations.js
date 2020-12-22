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

export const CREATE_REVIEW = gql`
mutation createNewReview(
  $repositoryName: String!,
  $ownerName: String!,
  $rating: Int!,
  $text: String
) {
  createReview(review: {
    repositoryName: $repositoryName,
		ownerName: $ownerName,
		rating: $rating,
		text: $text
  }) {
    repositoryId,
  }
}
`;

export const DELETE_REVIEW = gql`
mutation deleteReview(
  $id: ID!
) {
  deleteReview(id: $id)
}
`;