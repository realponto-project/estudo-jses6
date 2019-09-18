import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import GerenciarEntrada from './GEntradaContainer'

class GerenciarEntradaDashRoute extends Component{

  render() {
    return(
        <Switch>
          <Route exact path='/logged/entradaDash/dash' component={GerenciarEntrada}/>  
        </Switch>
    )
  }
}


export default GerenciarEntradaDashRoute