import actions from '../../../../store/actions'


const INICIAL_STATE_REDIRECT_ENTRADA ={
  id: '',
  stockBase: '',
  amountAdded: '',
  razaoSocial: '',
  name: '',
  companyId: '',
  productId: '',
  serial: false,
  createdAt: '',
}

export function entradaUpdateValue(state = INICIAL_STATE_REDIRECT_ENTRADA, action) {
  
  switch(action.type){
    case actions.REDIRECT.ENTRADA:
      return {...state,
        ...action.payload,
      }
    default:
      return state
  }
}