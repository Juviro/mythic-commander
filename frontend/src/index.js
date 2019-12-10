import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'

import 'antd/dist/antd.css'
import './index.css'

import App from './components/App'
import client from './network/graphqlClient'
import { CardContextProvider } from './components/CardProvider/CardProvider'

ReactDOM.render(
  <ApolloProvider client={client}>
    <CardContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CardContextProvider>
  </ApolloProvider>,
  document.getElementById('root')
)
