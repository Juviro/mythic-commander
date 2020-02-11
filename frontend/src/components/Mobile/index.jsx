import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Menu from './Menu';
import Deck from './Deck';
import Decks from './Decks';
import Card from './Card';
import Cards from './Cards';

import GlobalStyle from './GlobalStyle';

const App = () => {
  return (
    <>
      <Menu>
        <Switch>
          <Route path="/m/decks/:id" component={Deck} />
          <Route path="/m/decks" exact component={Decks} />
          <Route path="/m/cards/:oracle_id/:cardId" component={Card} />
          <Route path="/m/cards/:oracle_id/" component={Card} />
          <Route path="/m/cards" exact component={Cards} />
          <Redirect from="*" to="/m/decks" />
        </Switch>
      </Menu>
      <GlobalStyle />
    </>
  );
};

export default App;
