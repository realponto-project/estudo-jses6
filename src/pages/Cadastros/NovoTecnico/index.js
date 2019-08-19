import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import NovoTecnico from './TecnicoContainer'

class NovoTecnicoRoute extends Component{

  render() {
    return(
        <Switch>
          <Route exact path='/logged/novoTecnico/add' component={NovoTecnico}/>  
        </Switch>
    )
  }
}


export default NovoTecnicoRoute