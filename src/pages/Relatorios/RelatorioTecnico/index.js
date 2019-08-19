import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import RelatorioTecnico from './RelatorioTecnicoContainer'

class RelatorioTecnicoRoute extends Component{

  render() {
    return(
        <Switch>
          <Route exact path='/logged/relatorioTecnico/dash' component={RelatorioTecnico}/>  
        </Switch>
    )
  }
}


export default RelatorioTecnicoRoute