import { combineReducers } from 'redux'

import { login, auth } from '../pages/Login/LoginRedux/reduce'
import { osUpdateValue } from '../pages/Gerenciar/Os/OsRedux/reduce'


const appReducer = combineReducers({
  login,
  auth,
  osUpdateValue,
})


const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT_AUTH') {
    state = undefined
  }

  return appReducer(state, action)
}


export default rootReducer

