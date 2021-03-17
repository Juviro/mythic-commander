import { useContext } from 'react';
import UserContext from 'components/Provider/UserProvider';

export default (flag: string): boolean | null => {
  const { user, loading } = useContext(UserContext);

  if (loading) return null;

  return Boolean(user?.featureFlags?.includes(flag));
};
