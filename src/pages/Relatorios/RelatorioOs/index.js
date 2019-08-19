import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import RelatorioOs from './RelatorioOsContainer'

class RelatorioOsRoute extends Component{

  render() {
    return(
        <Switch>
          <Route exact path='/logged/relatorioOs/dash' component={RelatorioOs}/>  
        </Switch>
    )
  }
}


export default RelatorioOsRoute