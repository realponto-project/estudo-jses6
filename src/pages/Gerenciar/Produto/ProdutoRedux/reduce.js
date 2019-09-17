import actions from '../../../../store/actions'


const INICIAL_STATE_REDIRECT_PRODUTO ={
  name: '',
  category: '',
  mark: '',
  type: '',
  manufacturer: '',
  description: '',
  sku: '',
  minimumStock: '',
  serial: false,
}

export function produtoUpdateValue(state = INICIAL_STATE_REDIRECT_PRODUTO, action) {
  
  switch(action.type){
    case actions.REDIRECT.PRODUTO:
      return {...state,
        ...action.payload,
      }
    default:
      return state
  }
}