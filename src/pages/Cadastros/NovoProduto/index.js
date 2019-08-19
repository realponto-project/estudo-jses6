import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import NovoProduto from './ProdutoContainer'

class NovoProdutoRoute extends Component{

  render() {
    return(
        <Switch>
          <Route exact path='/logged/novoProduto/add' component={NovoProduto}/>  
        </Switch>
    )
  }
}


export default NovoProdutoRoute