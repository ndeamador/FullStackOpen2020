import { useQuery } from '@apollo/client';
import { CURRENT_USER } from '../graphql/queries';

const useCurrentUser = (variables) => {

  const { data, loading, fetchMore, ...result } = useQuery(CURRENT_USER, {
    // it seems that the cache-and-network fetchPolicy makes the fetchMore buggy in this case.
    fetchPolicy: 'cache-and-network',
    variables,
    onError: (error) => {console.log('CURRENT_USER Query error: ', error);}
  });


  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data && data.authorizedUser.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: CURRENT_USER,
      variables: {
        ...variables,
        after: data.authorizedUser.reviews.pageInfo.endCursor
      },
      fetchPolicy: 'cache-and-network',
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          authorizedUser: {
            ...fetchMoreResult.authorizedUser,
            reviews: {
              ...fetchMoreResult.authorizedUser.reviews,
              edges: [
                ...previousResult.authorizedUser.reviews.edges,
                ...fetchMoreResult.authorizedUser.reviews.edges,
              ],

            },
          },
        };

        return nextResult;
      },
    });
  };

  return {
    authorizedUser: data ? data.authorizedUser : undefined,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useCurrentUser;