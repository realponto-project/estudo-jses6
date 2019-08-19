import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import GerenciarEntrada from './GerenciarEntradaContainer'

class GerenciarEntradaRoute extends Component{

  render() {
    return(
        <Switch>
          <Route exact path='/logged/gerenciarEntrada/dash' component={GerenciarEntrada}/>  
        </Switch>
    )
  }
}


export default GerenciarEntradaRoute