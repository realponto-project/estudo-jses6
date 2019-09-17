import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import GerenciarTecnico from './GTecnicoContainer'

class GerenciarTecnicoRoute extends Component{

  render() {
    return(
        <Switch>
          <Route exact path='/logged/gerenciarTecnico/dash' component={GerenciarTecnico}/>  
        </Switch>
    )
  }
}


export default GerenciarTecnicoRoute