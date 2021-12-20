import UserContext from 'components/Provider/UserProvider';
import { useContext } from 'react';

export default ({ children = null, flag }) => {
  const { loading, hasFeatureFlag } = useContext(UserContext);

  if (!flag) return children;
  if (loading) return null;
  if (hasFeatureFlag(flag)) return children;

  return null;
};
