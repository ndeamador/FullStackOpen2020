import { gql } from 'apollo-boost';


export const CORE_REPOSITORY_PARTS = gql`
fragment CoreRepositoryParts on Repository {
  createdAt,
  description,
  forksCount,
  fullName,
  id,
  language,
  name,
  ownerAvatarUrl,
  ownerName,
  ratingAverage,
  reviewCount,
  stargazersCount,
}
`;
