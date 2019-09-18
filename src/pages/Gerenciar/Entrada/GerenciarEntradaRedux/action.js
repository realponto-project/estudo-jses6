import action from '../../../../store/actions'

export function redirectValueEntrada(value) {
  return dispatch => dispatch({
        type: action.REDIRECT.ENTRADA,
        payload: value,
      })
  }