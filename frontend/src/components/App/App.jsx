import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Menu from './Menu';
import Login from '../Login';
import Search from '../Search';
import Collection from '../Collection';
import Decks from '../Decks';
import Deck from '../Decks/Deck';

import { GlobalStyle } from './GlobalStyle';

const App = () => {
  return (
    <>
      <Switch>
        <Menu>
          <Route path="/login" component={Login} />
          <Route path="/search" component={Search} />
          <Route path="/collection" component={Collection} />
          <Route path="/decks" component={Decks} />
          <Route path="/deck/:id" component={Deck} />
        </Menu>
      </Switch>
      <GlobalStyle />
    </>
  );
};

export default App;
