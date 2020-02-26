import actions from '../../../../store/actions'


const INICIAL_STATE_REDIRECT_OS ={
  id: '',
  Os: '',
  razaoSocial: '',
  cnpj: '',
  technician: '',
  technicianId: '',
  date: '',
  products: [],
}

export function osUpdateValue(state = INICIAL_STATE_REDIRECT_OS, action) {
  
  switch(action.type){
    case actions.REDIRECT.OS:
      return {...state,
        ...action.payload,
      }
    default:
      return state
  }
}