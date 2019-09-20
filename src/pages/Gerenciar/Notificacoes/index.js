import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import NotificacaoDash from './NotificacoesContainer'

class NotificacaoRoute extends Component{

  render() {
    return(
        <Switch>
          <Route exact path='/logged/notificacao/dash' component={NotificacaoDash}/>  
        </Switch>
    )
  }
}


export default NotificacaoRoute