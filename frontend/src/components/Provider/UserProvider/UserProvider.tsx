import React from 'react';
import { useQuery } from 'react-apollo';

import { getUser } from './queries';

const UserContext = React.createContext({
  user: null,
  loading: true,
});

export const UserContextProvider = ({ children }) => {
  const { data, loading } = useQuery(getUser);

  return (
    <UserContext.Provider value={{ user: data?.user, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
