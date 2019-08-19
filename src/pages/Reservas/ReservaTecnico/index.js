import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import ReservaTecnico from './TecnicoContainer'

class ReservaTecnicoRoute extends Component{

  render() {
    return(
        <Switch>
          <Route exact path='/logged/reservaTecnico/dash' component={ReservaTecnico}/>  
        </Switch>
    )
  }
}


export default ReservaTecnicoRoute