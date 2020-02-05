import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Desktop from './Desktop';
import Mobile from './Mobile';
import Login from './Elements/Login';
import GlobalStyle from './GlobalStyle';
// import { getCards } from '../queries';
// import client from '../network/graphqlClient';

const App = () => {
  return (
    <>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/m/" component={Mobile} />
        <Route component={Desktop} />
      </Switch>
      <GlobalStyle />
    </>
  );
};

export default App;

// const test = async () => {
//   const result = await client.query({ query: getCards });
//   console.log('result :', result);
// };
// test();
