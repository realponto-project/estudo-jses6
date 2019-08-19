import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import Estoque from './EstoqueContainer'

class EstoqueRoute extends Component{

  render() {
    return(
        <Switch>
          <Route exact path='/logged/estoque/dash' component={Estoque}/>  
        </Switch>
    )
  }
}


export default EstoqueRoute