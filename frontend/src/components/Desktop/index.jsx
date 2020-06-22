import React from 'react';
import styled from 'styled-components';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Route, Switch, Redirect } from 'react-router-dom';

import Menu from './Menu';
import Search from './Search';
import Collection from './Collection/Collection';
import WantsLists from './WantsLists';
import WantsList from './WantsList';
import Decks from './Decks';
import Deck from './Deck';
import Card from './Card';

import GlobalStyle from './GlobalStyle';
import MobileRedirect from './MobileRedirect';
import { UsernameModal } from '../Elements/Shared';

const StyledBody = styled.div`
  height: 100%;
  padding-top: 46px;
  position: relative;
`;

const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <MobileRedirect>
        <Menu />
        {/* <UsernameModal /> */}
        <StyledBody>
          <Switch>
            <Route path="/search" exact component={Search} />
            <Route path="/collection" component={Collection} />
            <Route path="/decks" exact component={Decks} />
            <Route path="/decks/:id" exact component={Deck} />
            <Route path="/wants" exact component={WantsLists} />
            <Route path="/wants/:id" exact component={WantsList} />
            <Route path="/cards/:oracle_id" exact component={Card} />
            <Redirect from="*" to="/collection" />
          </Switch>
        </StyledBody>
        <GlobalStyle />
      </MobileRedirect>
    </DndProvider>
  );
};

export default App;
