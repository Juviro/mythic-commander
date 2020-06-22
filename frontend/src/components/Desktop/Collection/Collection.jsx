import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Private from './Private';
import Public from './Public';

export default () => {
  return (
    <Switch>
      <Route path="/collection/user/:username" exact component={Public} />
      <Route component={Private} />
    </Switch>
  );
};
