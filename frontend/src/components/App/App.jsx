import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import Search from '../Search'
import Menu from './Menu'

const dummy = () => <div>Hello</div>

const App = () => {
  return (
    <Switch>
      <Menu>
        <Route path="/search" component={Search} />
        <Route path="/cards" component={dummy} />
        <Route path="/decks" component={dummy} />
        <Redirect to="/search" />
      </Menu>
    </Switch>
  )
}

export default App
