import { gql } from 'apollo-boost';
import { CORE_REPOSITORY_PARTS } from './fragments';

export const GET_REPOSITORIES = gql`
query {
  repositories
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
    url
  }
}
${CORE_REPOSITORY_PARTS}
`;