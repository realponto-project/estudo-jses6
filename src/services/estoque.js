import axios from 'axios'
import { BACKEND_URL } from './var'
import { store } from '../App'

export const stock = async () => {
    const storeObject = store.getState()
  
    const headers = {
      token: storeObject.auth.token,
      username: storeObject.auth.username,
    }
  
    let response = {}
  
    await axios.get(`${BACKEND_URL}/api/stock`, { headers: headers, params: { query: null} }).then(
      resp => {
        response = resp
      }
    ).catch((error) => {
      if (error.response) {
        response = error.response
      } else {
        console.log('Error', error.message);
      }
    })
    return response
  } 