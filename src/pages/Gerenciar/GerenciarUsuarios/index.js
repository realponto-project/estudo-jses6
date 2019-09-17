import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import GerenciarUsuario from './GUsuarioContainer'

class GerenciarUsuarioRoute extends Component{

  render() {
    return(
        <Switch>
          <Route exact path='/logged/gerenciarUsuario/dash' component={GerenciarUsuario}/>  
        </Switch>
    )
  }
}


export default GerenciarUsuarioRoute