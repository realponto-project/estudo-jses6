import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import NovaEntrada from './EntradaContainer'

class NovaEntradaRoute extends Component{

  render() {
    return(
        <Switch>
          <Route exact path='/logged/entrada/add' component={NovaEntrada}/>  
        </Switch>
    )
  }
}


export default NovaEntradaRoute