import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import OsDash from './OsContainer'

class OsDashRoute extends Component{

  render() {
    return(
        <Switch>
          <Route exact path='/logged/Os/dash' component={OsDash}/>  
        </Switch>
    )
  }
}


export default OsDashRoute