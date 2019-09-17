import action from '../../../../store/actions'

export function redirectValueProduto(value) {
  return dispatch => dispatch({
        type: action.REDIRECT.PRODUTO,
        payload: value,
      })
  }