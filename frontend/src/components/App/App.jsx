import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Menu from './Menu'
import Login from '../Login'
import Search from '../Search'
import Collection from '../Collection'
import { GlobalStyle } from './GlobalStyle'

const dummy = () => <div>Hello</div>

const App = () => {
  return (
    <>
      <Switch>
        <Menu>
          <Route path="/login" component={Login} />
          <Route path="/search" component={Search} />
          <Route path="/collection" component={Collection} />
          <Route path="/decks" component={dummy} />
        </Menu>
      </Switch>
      <GlobalStyle />
    </>
  )
}

export default App
