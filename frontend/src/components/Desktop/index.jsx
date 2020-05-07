import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Menu from './Menu';
import Search from './Search';
import Collection from './Collection';
import WantsLists from './WantsLists';
import WantsList from './WantsList';
import Decks from './Decks';
import Deck from './Deck';
import Card from './Card';

import GlobalStyle from './GlobalStyle';
import MobileRedirect from './MobileRedirect';

const App = () => {
  return (
    <MobileRedirect>
      <Menu />
      <Switch>
        <Route path="/search" component={Search} />
        <Route path="/collection" component={Collection} />
        <Route path="/decks" component={Decks} />
        <Route path="/deck/:id" component={Deck} />
        <Route path="/wants" component={WantsLists} />
        <Route path="/wants/:id" component={WantsList} />
        <Route path="/cards/:oracle_id" component={Card} />
        <Redirect from="*" to="/collection" />
      </Switch>
      <GlobalStyle />
    </MobileRedirect>
  );
};

export default App;
