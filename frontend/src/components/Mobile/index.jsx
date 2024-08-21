import React, { Suspense } from 'react';
import { message } from 'antd';
import { Route, Switch, Redirect } from 'react-router-dom';

import UsernameModal from 'components/Elements/Shared/UsernameModal';
import CollectionBySet from 'components/Desktop/CollectionBySet/CollectionBySet';
import Menu from './Menu';

import GlobalStyle from './GlobalStyle';

import LifeTracker from './LifeTracker';

const Deck = React.lazy(() => import('./Deck'));
const Decks = React.lazy(() => import('./Decks'));
const Card = React.lazy(() => import('./Card'));
const Search = React.lazy(() => import('./Search'));
const Collection = React.lazy(() => import('./Collection'));
const WantsList = React.lazy(() => import('./WantsList'));
const WantsLists = React.lazy(() => import('./WantsLists'));
const Friends = React.lazy(() => import('./Friends/Friends'));

const Mobile = () => {
  message.config({
    top: 55,
    duration: 3,
    maxCount: 3,
  });

  return (
    <>
      <Menu />
      <UsernameModal />
      <Suspense fallback={<div />}>
        <Switch>
          <Route path="/m/search" exact component={Search} />
          <Route path="/m/my-decks" exact component={Decks} />
          <Route path="/m/decks/:id" exact component={Deck} />
          <Route path="/m/cards/:oracle_id" component={Card} />
          <Route path="/m/collection/by-set" component={CollectionBySet} />
          <Route path="/m/collection/:username" exact component={Collection} />
          <Route path="/m/collection" exact component={Collection} />
          <Route path="/m/my-wants" exact component={WantsLists} />
          <Route path="/m/friends" exact component={Friends} />
          <Route path="/m/wants/:id" exact component={WantsList} />
          <Route path="/m/life-tracker" component={LifeTracker} />
          <Redirect from="*" to="/m/collection" />
        </Switch>
      </Suspense>
      <GlobalStyle />
    </>
  );
};

export default Mobile;
