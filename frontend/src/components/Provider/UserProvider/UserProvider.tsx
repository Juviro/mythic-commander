import React from 'react';
import { useQuery } from 'react-apollo';

import { getUser } from './queries';

const UserContext = React.createContext({
  user: null,
  loading: true,
  error: null,
});

export const UserContextProvider = ({ children }) => {
  const { data, loading, error } = useQuery(getUser);

  return (
    <UserContext.Provider value={{ user: data?.user, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
