import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import GerenciarFornecedor from './GFornecedoresContainer'

class GerenciarFornecedorRoute extends Component{

  render() {
    return(
        <Switch>
          <Route exact path='/logged/gerenciarFornecedor/dash' component={GerenciarFornecedor}/>  
        </Switch>
    )
  }
}


export default GerenciarFornecedorRoute