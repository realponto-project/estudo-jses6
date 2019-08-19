import action from '../../../store/actions'
import { authentic, logout as logoutService  } from '../../../services/auth'

export function changeValue(e) {
  return {
    type: action.LOGIN.CHANGE_VALUE,
    payload: e.target,
  }
}

export function onSubmit(value) {
  return dispatch => {
    authentic(value).then(
      resp => dispatch({
        type: action.LOGIN.AUTH,
        payload: resp,
      })
    )
  }
}

export function Logout(value) {
  
  return dispatch => {
    logoutService(value).then(
      dispatch({
        type: action.LOGIN.LOGOUT,
        payload: null,
      })
    )
  }
}