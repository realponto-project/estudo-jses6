import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import ReservaML from './MLContainer'

class ReservaMLRoute extends Component{

  render() {
    return(
        <Switch>
          <Route exact path='/logged/reservaML/dash' component={ReservaML}/>  
        </Switch>
    )
  }
}


export default ReservaMLRoute