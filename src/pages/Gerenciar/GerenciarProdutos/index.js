import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import GerenciarProduto from './GProdutoContainer'

class GerenciarProdutoRoute extends Component{

  render() {
    return(
        <Switch>
          <Route exact path='/logged/gerenciarProdutos/dash' component={GerenciarProduto}/>  
        </Switch>
    )
  }
}


export default GerenciarProdutoRoute