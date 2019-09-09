import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import GerenciarProdutoDash from './ProdutoContainer'

class GerenciarProdutoRoute extends Component{

  render() {
    return(
        <Switch>
          <Route exact path='/logged/gerenciarProduto/dash' component={GerenciarProdutoDash}/>  
        </Switch>
    )
  }
}


export default GerenciarProdutoRoute