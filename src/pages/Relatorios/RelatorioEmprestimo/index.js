import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import RelatorioEmprestimoContainer from './RelatorioEmprestimoContainer'

class RelatorioEmprestimoRoute extends Component{

  render() {
    return(
        <Switch>
          <Route exact path='/logged/relatorioEmprestimo/dash' component={RelatorioEmprestimoContainer}/>  
        </Switch>
    )
  }
}


export default RelatorioEmprestimoRoute