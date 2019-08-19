import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import AddKit from './AddKitContainer'

class AddKitRoute extends Component{

  render() {
    return(
        <Switch>
          <Route exact path='/logged/reservaKitAdd/add' component={AddKit}/>  
        </Switch>
    )
  }
}


export default AddKitRoute