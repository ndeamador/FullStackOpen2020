import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';
import { useState } from "react";

export const sortingQueryOptions = {
  creationDate: 'CREATED_AT',
  rating: 'RATING_AVERAGE',
  ascending: 'ASC',
  descending: 'DESC'
};

const useRepositories = (orderBy, orderDirection) => {

  // const [orderBy, setOrderBy] = useState(sortingQueryOptions.creationDate);
  // const [orderDirection, setOrderDirection] = useState(sortingQueryOptions.descending);

  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: {
      orderDirection,
      orderBy
    }
  });

  const repositories = data ? data.repositories : undefined;

  return { repositories };
};

export default useRepositories;


  // const [repositories, setRepositories] = useState();
  // const [loading, setLoading] = useState(false);

  // const fetchRepositories = async () => {
  //   setLoading(true);


  //   const response = await fetch('http://192.168.20.5:5000/api/repositories');

  //   const json = await response.json();

  //   setLoading(false);
  //   setRepositories(json);
  // };

  // useEffect(() => {
  //   fetchRepositories();
  // }, []);

  // return { repositories, loading, refetch: fetchRepositories };