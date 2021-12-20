import React from 'react';
import { useQuery } from 'react-apollo';
import { User } from 'types/graphql';

import { getUser } from './queries';

const UserContext = React.createContext<{
  user?: User;
  loading: boolean;
  error: any;
  hasFeatureFlag: (flag: string) => boolean;
}>({
  user: null,
  loading: true,
  error: null,
  hasFeatureFlag: () => false,
});

export const UserContextProvider = ({ children }) => {
  const { data, loading, error } = useQuery(getUser);

  const hasFeatureFlag = (flag: string) => {
    return Boolean(data?.user?.featureFlags?.includes(flag));
  };

  return (
    <UserContext.Provider value={{ user: data?.user, loading, error, hasFeatureFlag }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
