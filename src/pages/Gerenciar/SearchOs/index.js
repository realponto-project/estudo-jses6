import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import SearchOsDash from './SearchOsContainer'

class SearchOsRoute extends Component{

  render() {
    return(
        <Switch>
          <Route exact path='/logged/searchOs/dash' component={SearchOsDash}/>  
        </Switch>
    )
  }
}


export default SearchOsRoute