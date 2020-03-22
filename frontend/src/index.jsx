import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { QueryParamProvider } from 'use-query-params';
import { createBrowserHistory } from 'history';

import 'antd/dist/antd.css';
import './index.css';

import App from './components';
import client from './network/graphqlClient';
import { CardContextProvider } from './components/CardProvider/CardProvider';

export const history = createBrowserHistory();
console.log('DEPLOYED');
ReactDOM.render(
  <ApolloProvider client={client}>
    <CardContextProvider>
      <Router history={history}>
        <QueryParamProvider ReactRouterRoute={Route}>
          <App />
        </QueryParamProvider>
      </Router>
    </CardContextProvider>
  </ApolloProvider>,
  document.getElementById('root')
);
