import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import styled from 'styled-components';
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

const StyledBody = styled.div`
  height: 100%;
  padding-top: 46px;
  position: relative;
`;

const App = () => {
  return (
    <MobileRedirect>
      <Menu />
      <StyledBody>
        <Switch>
          <Route path="/search" exact component={Search} />
          <Route path="/collection" exact component={Collection} />
          <Route path="/decks" exact component={Decks} />
          <Route path="/deck/:id" exact component={Deck} />
          <Route path="/wants" exact component={WantsLists} />
          <Route path="/wants/:id" exact component={WantsList} />
          <Route path="/cards/:oracle_id" exact component={Card} />
          <Redirect from="*" to="/collection" />
        </Switch>
      </StyledBody>
      <GlobalStyle />
    </MobileRedirect>
  );
};

export default App;
