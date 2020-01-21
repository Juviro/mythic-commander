import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { QueryParamProvider } from 'use-query-params';

import 'antd/dist/antd.css';
import './index.css';

import App from './components';
import client from './network/graphqlClient';
import { CardContextProvider } from './components/CardProvider/CardProvider';

ReactDOM.render(
  <ApolloProvider client={client}>
    <CardContextProvider>
      <BrowserRouter>
        <QueryParamProvider ReactRouterRoute={Route}>
          <App />
        </QueryParamProvider>
      </BrowserRouter>
    </CardContextProvider>
  </ApolloProvider>,
  document.getElementById('root')
);
