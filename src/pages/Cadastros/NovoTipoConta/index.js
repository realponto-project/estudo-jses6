import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import NovoTipoConta from './TipoContaContainer'

class NovoTipoContaRoute extends Component{

  render() {
    return(
        <Switch>
          <Route exact path='/logged/novoTipoConta/add' component={NovoTipoConta}/>  
        </Switch>
    )
  }
}


export default NovoTipoContaRoute
