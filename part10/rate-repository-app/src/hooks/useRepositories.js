import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

export const sortingQueryOptions = {
  creationDate: 'CREATED_AT',
  rating: 'RATING_AVERAGE',
  ascending: 'ASC',
  descending: 'DESC'
};

const useRepositories = (orderBy, orderDirection, searchKeyword) => {

  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: {
      orderDirection,
      orderBy,
      searchKeyword
    }
  });

  const repositories = data ? data.repositories : undefined;

  return { repositories };
};

export default useRepositories;