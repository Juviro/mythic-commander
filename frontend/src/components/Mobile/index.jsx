import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { message } from 'antd';
import Menu from './Menu';
import Deck from './Deck';
import Decks from './Decks';
import Card from './Card';
import Search from './Search';
import Collection from './Collection';
import WantsList from './WantsList';
import WantsLists from './WantsLists';

import GlobalStyle from './GlobalStyle';
import { UsernameModal } from '../Elements/Shared';
import LifeTracker from './LifeTracker';

const App = () => {
  message.config({
    top: 55,
    duration: 3,
    maxCount: 3,
  });

  return (
    <>
      <Menu />
      <UsernameModal />
      <Switch>
        <Route path="/m/search" exact component={Search} />
        <Route path="/m/decks" exact component={Decks} />
        <Route path="/m/decks/:id" exact component={Deck} />
        <Route path="/m/cards/:oracle_id" component={Card} />
        <Route path="/m/collection/:username" exact component={Collection} />
        <Route path="/m/collection" exact component={Collection} />
        <Route path="/m/wants" exact component={WantsLists} />
        <Route path="/m/wants/:id" exact component={WantsList} />
        <Route path="/m/life-tracker" exact component={LifeTracker} />
        <Redirect from="*" to="/m/collection" />
      </Switch>
      <GlobalStyle />
    </>
  );
};

export default App;
