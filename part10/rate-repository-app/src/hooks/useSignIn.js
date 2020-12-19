
import { useMutation } from '@apollo/react-hooks';
import { AUTHORIZE_USER } from '../graphql/mutations';

const useSignIn = () => {
  const [authorizeUser, result] = useMutation(AUTHORIZE_USER);

  const signIn = async ({ username, password }) => {
    const { data } = await authorizeUser({ variables: { username, password } });

    return { data };
  };

  return [signIn, result];
};

export default useSignIn;