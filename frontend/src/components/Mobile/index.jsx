import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Menu from './Menu';

// import Search from '../Search';
// import Collection from '../Collection';
// import Decks from '../Decks';
// import Deck from '../Deck';

const App = () => {
  return (
    <>
      <Switch>
        <Menu>
          <div>Hello World</div>
          {/* <Route path="/search" component={Search} />
          <Route path="/collection" component={Collection} />
          <Route path="/decks" component={Decks} />
          <Route path="/deck/:id" component={Deck} /> */}
        </Menu>
      </Switch>
    </>
  );
};

export default App;
