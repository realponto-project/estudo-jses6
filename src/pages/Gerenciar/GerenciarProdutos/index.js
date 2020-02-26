import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import GerenciarProdutos from './GProdutoContainer'

class GerenciarProdutosDashRoute extends Component{

  render() {
    return(
        <Switch>
          <Route exact path='/logged/gerenciarProdutosDash/dash' component={GerenciarProdutos}/>  
        </Switch>
    )
  }
}


export default GerenciarProdutosDashRoute