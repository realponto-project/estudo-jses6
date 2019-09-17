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

const INICIAL_STATE_REDIRECT_FORNECEDOR ={
  id: '',
  cnpj: '',
  razaoSocial: '',
  zipCode: '',
  state: '',
  city: '',
  neighborhood: '',
  street: '',
  number: '',
  complement: '',
  referencePoint: '',
  nameContact: '',
  email: '',
  telphone: '',
}

export function fornecedorUpdateValue(state = INICIAL_STATE_REDIRECT_FORNECEDOR, action) {
  
  switch(action.type){
    case actions.REDIRECT.FORNECEDOR:
      return {...state,
        ...action.payload,
      }
    default:
      return state
  }
}

const INICIAL_STATE_REDIRECT_USUARIO ={
  id: '',
  customized: '',
  typeName: '',
  username: '',
  resource: '',
}

export function usuarioUpdateValue(state = INICIAL_STATE_REDIRECT_USUARIO, action) {
  
  switch(action.type){
    case actions.REDIRECT.USUARIO:
      return {...state,
        ...action.payload,
      }
    default:
      return state
  }
}

const INICIAL_STATE_REDIRECT_TECNICO ={
  id: '',
  name: '',
  CNH: '',
  plate: '',
  external: '',
}

export function tecnicoUpdateValue(state = INICIAL_STATE_REDIRECT_TECNICO, action) {
  
  switch(action.type){
    case actions.REDIRECT.TECNICO:
      return {...state,
        ...action.payload,
      }
    default:
      return state
  }
}
