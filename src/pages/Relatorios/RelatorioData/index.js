import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import RelatorioData from './RelatorioDataContainer'

class RelatorioDataRoute extends Component{

  render() {
    return(
        <Switch>
          <Route exact path='/logged/relatorioData/dash' component={RelatorioData}/>  
        </Switch>
    )
  }
}


export default RelatorioDataRoute