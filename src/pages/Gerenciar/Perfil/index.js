import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import PerfilDash from './PerfilContainer'

class PerfilDashRoute extends Component{

  render() {
    return(
        <Switch>
          <Route exact path='/logged/perfil/dash' component={PerfilDash}/>  
        </Switch>
    )
  }
}


export default PerfilDashRoute