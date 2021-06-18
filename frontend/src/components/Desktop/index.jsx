import React, { Suspense } from 'react';
import styled from 'styled-components';
import { Route, Switch, Redirect } from 'react-router-dom';

import UsernameModal from 'components/Elements/Shared/UsernameModal/UsernameModal';
import Menu from './Menu';

import GlobalStyle from './GlobalStyle';
import MobileRedirect from './MobileRedirect';

const Search = React.lazy(() => import('./Search'));
const Collection = React.lazy(() => import('./Collection/Collection'));
const WantsLists = React.lazy(() => import('./WantsLists'));
const WantsList = React.lazy(() => import('./WantsList'));
const Decks = React.lazy(() => import('./Decks'));
const Deck = React.lazy(() => import('./Deck'));
const Card = React.lazy(() => import('./Card'));

const StyledBody = styled.div`
  height: 100%;
  padding-top: 46px;
  position: relative;
`;

const Desktop = () => {
  return (
    <MobileRedirect>
      <Menu />
      <UsernameModal />
      <StyledBody>
        <Suspense fallback={<div />}>
          <Switch>
            <Route path="/search" exact component={Search} />
            <Route path="/collection/:username" component={Collection} />
            <Route path="/collection" component={Collection} />
            <Route path="/my-decks" exact component={Decks} />
            <Route path="/decks/:id" exact component={Deck} />
            <Route path="/my-wants" exact component={WantsLists} />
            <Route path="/wants/:id" exact component={WantsList} />
            <Route path="/cards/:oracle_id" exact component={Card} />
            <Redirect from="*" to="/collection" />
          </Switch>
        </Suspense>
      </StyledBody>
      <GlobalStyle />
    </MobileRedirect>
  );
};

export default Desktop;
