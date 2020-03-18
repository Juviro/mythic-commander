import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { message } from 'antd';
import Menu from './Menu';
import Deck from './Deck';
import Decks from './Decks';
import Card from './Card';
import Cards from './Cards';
import Collection from './Collection';

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
        <Route path="/m/decks/:id" component={Deck} />
        <Route path="/m/decks" exact component={Decks} />
        <Route path="/m/cards/:oracle_id/:cardId" component={Card} />
        <Route path="/m/cards/:oracle_id/" component={Card} />
        <Route
          path="/m/card-search/:oracle_id?/:cardId?"
          exact
          component={Cards}
        />
        <Route
          path="/m/collection/:oracle_id?/:cardId?"
          exact
          component={Collection}
        />
        <Redirect from="*" to="/m/decks" />
      </Switch>
      <GlobalStyle />
    </>
  );
};

export default App;
