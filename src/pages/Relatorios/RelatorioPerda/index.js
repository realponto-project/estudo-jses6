import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import RelatorioPerda from './RelatorioPerdaContainer'

class RelatorioPerdaRoute extends Component{

  render() {
    return(
        <Switch>
          <Route exact path='/logged/relatorioPerda/dash' component={RelatorioPerda}/>  
        </Switch>
    )
  }
}


export default RelatorioPerdaRoute