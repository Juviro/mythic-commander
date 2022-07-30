import React, { useMemo } from 'react';
import { useQuery } from '@apollo/client';
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

  const value = useMemo(
    () => ({
      user: data?.user,
      loading,
      error,
      hasFeatureFlag,
    }),
    [data?.user]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContext;
