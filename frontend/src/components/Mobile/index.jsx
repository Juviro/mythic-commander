import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Menu from './Menu';
import Deck from './Deck';
import Decks from './Decks';
import Card from './Card';
import Cards from './Cards';

import GlobalStyle from './GlobalStyle';

const App = () => {
  return (
    <>
      <Switch>
        <Menu>
          <Route path="/m/decks/:id" component={Deck} />
          <Route path="/m/decks" exact component={Decks} />
          <Route path="/m/cards/:id" component={Card} />
          <Route path="/m/cards" exact component={Cards} />
        </Menu>
      </Switch>
      <GlobalStyle />
    </>
  );
};

export default App;
