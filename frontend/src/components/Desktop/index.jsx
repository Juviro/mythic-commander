import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Menu from './Menu';
import Search from './Search';
import Collection from './Collection';
import Decks from './Decks';
import Deck from './Deck';

import GlobalStyle from './GlobalStyle';
import MobileRedirect from './MobileRedirect';

// TODO: remove Menu from switch, add redirect
const App = () => {
  return (
    <MobileRedirect>
      <Switch>
        <Menu>
          <Route path="/search" component={Search} />
          <Route path="/collection" component={Collection} />
          <Route path="/decks" component={Decks} />
          <Route path="/deck/:id" component={Deck} />
        </Menu>
      </Switch>
      <GlobalStyle />
    </MobileRedirect>
  );
};

export default App;
