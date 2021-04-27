import React, { Suspense } from 'react';
import { DndProvider } from 'react-dnd';
import { Route, Switch } from 'react-router-dom';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Proxy from './Proxy';
import GlobalStyle from './GlobalStyle';

const Mobile = React.lazy(() => import('./Mobile'));
const Desktop = React.lazy(() => import('./Desktop'));
const Login = React.lazy(() => import('./Elements/Shared/Login/Login'));
const NotFound = React.lazy(() => import('./Elements/Shared/NotFound'));

const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Suspense fallback={<div />}>
        <Switch>
          <Route path="/404" exact component={NotFound} />
          <Route path="/proxy/:type/:value" exact component={Proxy} />
          <Route path="/login" component={Login} />
          <Route path="/m/" component={Mobile} />
          <Route component={Desktop} />
        </Switch>
      </Suspense>
      <GlobalStyle />
    </DndProvider>
  );
};

export default App;
