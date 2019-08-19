import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import RelatorioML from './RelatorioMLContainer'

class RelatorioMLRoute extends Component{

  render() {
    return(
        <Switch>
          <Route exact path='/logged/relatorioML/dash' component={RelatorioML}/>  
        </Switch>
    )
  }
}


export default RelatorioMLRoute