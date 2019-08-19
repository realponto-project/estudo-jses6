import actions from '../../../store/actions'


const INICIAL_STATE_LOGIN ={
  username: '',
  password: '',
}

const INICIAL_STATE_AUTH ={
  token: null,
  userId: null,
  username: 'userName',
  email: 'email',
  validTonken: false,
  password: '',
}



export function login(state = INICIAL_STATE_LOGIN, action) {
  switch(action.type){
    case actions.LOGIN.CHANGE_VALUE:
      return { ...state, [action.payload.name]: action.payload.value }
    default:
      return state
  }
}

export function auth(state = INICIAL_STATE_AUTH, action) {
  switch(action.type){
    case actions.LOGIN.AUTH:
      let auth = {
        ...state
      }
      if (action.payload.status === 200){
        if (action.payload.data.token) {
          auth = {
            ...auth,
            ...action.payload.data,
          }
        }
      }

      return auth
    
    case actions.LOGIN.LOGOUT:
      return state = {}

    default:
      return state
  }
}

