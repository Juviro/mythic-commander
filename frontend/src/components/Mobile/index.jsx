import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Menu from './Menu';
import Decks from './Decks';
import Deck from './Deck';

import GlobalStyle from './GlobalStyle';
import Collection from './Collection';

const App = () => {
  return (
    <>
      <Switch>
        <Menu>
          <Route path="/m/collection" component={Collection} />
          <Route path="/m/decks" component={Decks} />
          <Route path="/m/deck/:id" component={Deck} />
        </Menu>
      </Switch>
      <GlobalStyle />
    </>
  );
};

export default App;
