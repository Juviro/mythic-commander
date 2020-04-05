import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Menu from './Menu';
import Search from './Search';
import Collection from './Collection';
import Decks from './Decks';
import Deck from './Deck';

import GlobalStyle from './GlobalStyle';
import MobileRedirect from './MobileRedirect';

const App = () => {
  return (
    <MobileRedirect>
      <Switch>
        <Menu>
          <Route path="/search" component={Search} />
          <Route path="/collection" component={Collection} />
          <Route path="/decks" component={Decks} />
          <Route path="/deck/:id" component={Deck} />
          <Redirect from="*" to="/collection" />
        </Menu>
      </Switch>
      <GlobalStyle />
    </MobileRedirect>
  );
};

export default App;
