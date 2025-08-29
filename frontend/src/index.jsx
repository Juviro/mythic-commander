import 'react-app-polyfill/stable';

import React from 'react';
import { Router, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { QueryParamProvider } from 'use-query-params';
import { createBrowserHistory } from 'history';
import { createRoot } from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';

import './index.css';

import { UserContextProvider } from 'components/Provider/UserProvider';
import App from './components';
import client from './network/graphqlClient';
import { CardContextProvider } from './components/Provider/CardProvider';
import { FocusContextProvider } from './components/Provider/FocusProvider';

const GOOGLE_CLIENT_ID =
  '985753697547-184gkcavnrc8f4flq1tdjra30amuchgo.apps.googleusercontent.com';

export const history = createBrowserHistory();

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <ApolloProvider client={client}>
      <UserContextProvider>
        <FocusContextProvider>
          <CardContextProvider>
            <Router history={history}>
              <QueryParamProvider ReactRouterRoute={Route}>
                <App />
              </QueryParamProvider>
            </Router>
          </CardContextProvider>
        </FocusContextProvider>
      </UserContextProvider>
    </ApolloProvider>
  </GoogleOAuthProvider>
);
