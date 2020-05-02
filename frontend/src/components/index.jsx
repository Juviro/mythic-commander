import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useQueryParam, BooleanParam } from 'use-query-params';

import Desktop from './Desktop';
import Mobile from './Mobile';
import { Login } from './Elements/Shared';
import GlobalStyle from './GlobalStyle';

const App = () => {
  const [, setBlock] = useQueryParam('blockShortcuts', BooleanParam);
  useEffect(() => setBlock(undefined), [setBlock]);

  return (
    <>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/m/" component={Mobile} />
        <Route component={Desktop} />
      </Switch>
      <GlobalStyle />
    </>
  );
};

export default App;
