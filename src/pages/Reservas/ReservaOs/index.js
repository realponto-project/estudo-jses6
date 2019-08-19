import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import ReservaOs from './OsContainer'

class ReservaOsRoute extends Component{

  render() {
    return(
        <Switch>
          <Route exact path='/logged/reservaOs/dash' component={ReservaOs}/>  
        </Switch>
    )
  }
}


export default ReservaOsRoute