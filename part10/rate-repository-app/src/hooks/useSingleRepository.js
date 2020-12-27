import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';

// export const sortingQueryOptions = {
//   creationDate: 'CREATED_AT',
//   rating: 'RATING_AVERAGE',
//   ascending: 'ASC',
//   descending: 'DESC'
// };

const useSingleRepository = (variables) => {

  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORY, {
    // it seems that the cache-and-network fetchPolicy makes the fetchMore buggy in this case.
    // fetchPolicy: 'cache-and-network',
    variables
  });

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data && data.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: GET_REPOSITORY,
      variables: {
        ...variables,
        after: data.repository.reviews.pageInfo.endCursor
      },
      // fetchPolicy: 'cache-and-network',
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          repository: {
            ...fetchMoreResult.repository,
            reviews: {
              ...fetchMoreResult.repository.reviews,
              edges: [
                ...previousResult.repository.reviews.edges,
                ...fetchMoreResult.repository.reviews.edges,
              ],

            },
          },
        };

        return nextResult;
      },
    });
  };


  return {
    repository: data ? data.repository : undefined,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useSingleRepository;