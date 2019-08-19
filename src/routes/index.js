import React from "react";
import { Route, Switch, HashRouter, Redirect } from 'react-router-dom'
// import { ConnectedRouter } from 'connected-react-router'

import PrivateRoute from './privateRoutes'

import LoginPage from '../pages/Login'

// import history from './history'

const Routes = () => (

  // <ConnectedRouter history={history}>
  <HashRouter>
    <Switch>
      <Route exact path='/login' component={LoginPage} />
      <PrivateRoute path='/logged' />
      <Redirect to='/login' />
    </Switch>
  </HashRouter>
  // </ConnectedRouter>
)

export default Routes