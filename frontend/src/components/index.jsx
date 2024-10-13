import React, { Suspense } from 'react';
import { DndProvider } from 'react-dnd';
import { Route, Switch } from 'react-router-dom';
import { HTML5Backend } from 'react-dnd-html5-backend';

import NotFound from 'components/Elements/Shared/NotFound';
import GlobalStyle from '../styles/GlobalStyle';
import LoginPage from './Elements/Shared/Login/LoginPage';
import SuspensePlaceholder from './Elements/Shared/SuspensePlaceholder/SuspensePlaceholder';
import FadeIn from './Elements/Shared/FadeIn';
import MobileRedirect from './Desktop/MobileRedirect';

const Mobile = React.lazy(() => import('./Mobile'));
const MobileWithSuspense = () => (
  <Suspense fallback={<SuspensePlaceholder menu="mobile" />}>
    <Mobile />
  </Suspense>
);
const Desktop = React.lazy(() => import('./Desktop'));

const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Suspense fallback={<SuspensePlaceholder />}>
        <FadeIn style={{ height: '100%' }}>
          <Switch>
            <Route path="/404" exact component={NotFound} />
            <Route path="/login" component={LoginPage} />
            <Route path="/m/" component={MobileWithSuspense} />
            <MobileRedirect>
              <Suspense fallback={<SuspensePlaceholder menu="desktop" />}>
                <Route component={Desktop} />
              </Suspense>
            </MobileRedirect>
          </Switch>
        </FadeIn>
      </Suspense>
      <GlobalStyle />
    </DndProvider>
  );
};

export default App;
