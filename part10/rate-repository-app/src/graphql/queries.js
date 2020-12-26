import { gql } from 'apollo-boost';
import { CORE_REPOSITORY_PARTS } from './fragments';

export const GET_REPOSITORIES = gql`
query getRepositories(
  $orderDirection: OrderDirection,
  $orderBy: AllRepositoriesOrderBy,
  $searchKeyword: String
) {
  repositories (
    orderDirection: $orderDirection,
    orderBy: $orderBy,
    searchKeyword: $searchKeyword
  )
   {
    edges {
      node {
        ...CoreRepositoryParts
      }
    }
  }
}
${CORE_REPOSITORY_PARTS}
`;

export const CURRENT_USER = gql`
{
  authorizedUser {
    id
    username
  }
}
`;

export const GET_REPOSITORY = gql`
query getRepositoryById($id: ID!) {
  repository(id: $id) {
    ...CoreRepositoryParts,
    url,
    reviews {
      edges {
        node {
          id
          text
          rating
          createdAt
          user {
            id
            username
          }
        }
      }
    }
  }
}
${CORE_REPOSITORY_PARTS}
`;