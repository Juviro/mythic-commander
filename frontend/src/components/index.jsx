import React, { Suspense } from 'react';
import { DndProvider } from 'react-dnd';
import { Route, Switch } from 'react-router-dom';
import { HTML5Backend } from 'react-dnd-html5-backend';

import NotFound from 'components/Elements/Shared/NotFound';
import GlobalStyle from './GlobalStyle';
import LoginPage from './Elements/Shared/Login/LoginPage';

const Mobile = React.lazy(() => import('./Mobile'));
const Desktop = React.lazy(() => import('./Desktop'));

const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Suspense fallback={<div />}>
        <Switch>
          <Route path="/404" exact component={NotFound} />
          <Route path="/login" component={LoginPage} />
          <Route path="/m/" component={Mobile} />
          <Route component={Desktop} />
        </Switch>
      </Suspense>
      <GlobalStyle />
    </DndProvider>
  );
};

export default App;
