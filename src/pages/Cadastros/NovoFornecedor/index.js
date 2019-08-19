import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import NovoFornecedor from './FornecedorContainer'

class NovoFornecedorRoute extends Component{

  render() {
    return(
        <Switch>
          <Route exact path='/logged/novoFornecedor/add' component={NovoFornecedor}/>  
        </Switch>
    )
  }
}


export default NovoFornecedorRoute