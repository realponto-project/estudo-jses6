import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import Rexterno from './OsContainer'

class ReservaExternoRoute extends Component{

  render() {
    return(
        <Switch>
          <Route exact path='/logged/Rexterno/dash' component={Rexterno}/>  
        </Switch>
    )
  }
}


export default ReservaExternoRoute