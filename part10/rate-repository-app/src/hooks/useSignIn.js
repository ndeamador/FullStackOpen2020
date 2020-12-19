
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { AUTHORIZE_USER } from '../graphql/mutations';
import { useContext } from 'react';
import AuthStorageContext from '../contexts/AuthStorageContext';
import { useHistory } from "react-router-native";


const useSignIn = () => {
  const authStorage = useContext(AuthStorageContext);
  const [authorizeUser, result] = useMutation(AUTHORIZE_USER);
  const history = useHistory();
  const apolloClient = useApolloClient();


  const signIn = async ({ username, password }) => {
    const { data } = await authorizeUser({ variables: { username, password } });

    await authStorage.setAccessToken(data.authorize.accessToken);

    // clear Apollo cache cache and re-execute all active queries (which means the "current user" query will be executed with a valid token)
    apolloClient.resetStore();

    history.push("/");
    return { data };
  };

  return [signIn, result];
};

export default useSignIn;