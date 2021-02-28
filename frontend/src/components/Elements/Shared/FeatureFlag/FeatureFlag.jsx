import { useQuery } from '@apollo/react-hooks';
import UserContext from 'components/Provider/UserProvider';
import { useContext } from 'react';

export default ({ children, flag }) => {
  const { user, loading } = useContext(UserContext);

  if (!flag) return children;
  if (loading) return null;
  if (user?.featureFlags?.includes(flag)) return children;

  return null;
};
