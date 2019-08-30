import action from '../../../../store/actions'

export function redirectValueOs(value) {
  return dispatch => dispatch({
        type: action.REDIRECT.OS,
        payload: value,
      })
  }