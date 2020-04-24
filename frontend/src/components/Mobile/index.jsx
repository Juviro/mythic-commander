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

const App = () => {
  message.config({
    top: 55,
    duration: 3,
    maxCount: 3,
  });

  return (
    <>
      <Menu />
      <Switch>
        <Route path="/m/search/:oracle_id?/:cardId?" exact component={Search} />
        <Route path="/m/decks" exact component={Decks} />
        <Route
          path="/m/decks/:id/:oracle_id?/:cardId?"
          exact
          component={Deck}
        />
        <Route path="/m/cards/:oracle_id/:cardId?" component={Card} />
        <Route
          path="/m/collection/:oracle_id?/:cardId?"
          exact
          component={Collection}
        />
        <Route path="/m/wants" exact component={WantsLists} />
        <Route
          path="/m/wants/:id/:oracle_id?/:cardId?"
          exact
          component={WantsList}
        />
        <Redirect from="*" to="/m/collection" />
      </Switch>
      <GlobalStyle />
    </>
  );
};

export default App;
