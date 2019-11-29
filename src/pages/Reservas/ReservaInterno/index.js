import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import Rinterno from './InternoContainer'

class ReservaInternoRoute extends Component{

  render() {
    return(
        <Switch>
          <Route exact path='/logged/Rinterno/dash' component={Rinterno}/>  
        </Switch>
    )
  }
}


export default ReservaInternoRoute