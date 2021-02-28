import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { UserContextProvider } from 'components/Provider/UserProvider';
import Desktop from './Desktop';
import Mobile from './Mobile';
import Proxy from './Proxy';
import { Login, NotFound } from './Elements/Shared';
import GlobalStyle from './GlobalStyle';

const App = () => {
  return (
    <UserContextProvider>
      <Switch>
        <Route path="/404" exact component={NotFound} />
        <Route path="/proxy/:type/:id" exact component={Proxy} />
        <Route path="/login" component={Login} />
        <Route path="/m/" component={Mobile} />
        <Route component={Desktop} />
      </Switch>
      <GlobalStyle />
    </UserContextProvider>
  );
};

export default App;
