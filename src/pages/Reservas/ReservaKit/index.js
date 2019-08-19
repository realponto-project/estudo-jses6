import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import ReservaKit from './KitContainer'

class ReservaKitRoute extends Component {

  render() {
    return (
      <Switch>
        <Route exact path='/logged/reservaKit/dash' component={ReservaKit} />
      </Switch>
    )
  }
}


export default ReservaKitRoute