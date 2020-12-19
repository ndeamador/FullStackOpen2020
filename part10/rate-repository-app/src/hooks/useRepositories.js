import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';


const useRepositories = () => {

  const { data, error, loading } =useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network'
  });

  const repositories = data ? data.repositories : undefined;
  return { repositories };


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
};

export default useRepositories;