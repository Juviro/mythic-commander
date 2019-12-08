import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import Search from '../Search'
import Menu from './Menu'

const App = () => {
  return (
    <Menu>
      <Switch>
        <Route path="/search" component={Search} />
        <Redirect to="/search" />
      </Switch>
    </Menu>
  )
}

export default App
