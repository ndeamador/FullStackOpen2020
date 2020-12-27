import { gql } from 'apollo-boost';
import { CORE_REPOSITORY_PARTS } from './fragments';

export const GET_REPOSITORIES = gql`
query getRepositories(
  $orderDirection: OrderDirection,
  $orderBy: AllRepositoriesOrderBy,
  $searchKeyword: String,
  $after: String,
  $first:Int
) {
  repositories (
    orderDirection: $orderDirection,
    orderBy: $orderBy,
    searchKeyword: $searchKeyword,
    after: $after,
    first: $first
  )
   {
    edges {
      node {
        ...CoreRepositoryParts
      }
      cursor
    }
    pageInfo{
      hasNextPage,
      totalCount,
      startCursor,
      endCursor
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
query getRepositoryById($id: ID!, $first: Int, $after: String) {
  repository(id: $id) {
    ...CoreRepositoryParts,
    url,
    reviews (first: $first, after: $after) {
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
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        totalCount
        hasNextPage
      }
    }
  }
}
${CORE_REPOSITORY_PARTS}
`;