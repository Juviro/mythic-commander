import { useQuery } from '@apollo/react-hooks';

import { getUser } from './queries';

export default ({ children, flag }) => {
  const { data, loading } = useQuery(getUser, { fetchPolicy: 'cache-first' });

  if (!flag) return children;
  if (loading) return null;
  if (data?.user.featureFlags?.includes(flag)) return children;

  return null;
};
