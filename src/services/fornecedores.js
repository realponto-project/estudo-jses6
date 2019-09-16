import axios from 'axios'
import { BACKEND_URL } from './var'
import { store } from '../App'


const url = cep => `https://viacep.com.br/ws/${cep}/json/`

 export const getAddressByZipCode = (cep) => {
  return axios.get(url(cep.replace(/\D+/g, '')))
}

export const getAllFornecedor = async (query) => {
  const storeObject = store.getState()

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username,
  }

  let response = {}

  await axios.get(`${BACKEND_URL}/api/company`, { headers: headers, params: { query } }).then(
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

export const getFornecedor = async () => {
  const storeObject = store.getState()

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username,
  }

  let response = {}

  await axios.get(`${BACKEND_URL}/api/company/getAllFornecedor`, { headers: headers, params: { } }).then(
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

export const newFornecedor = async (values) => {
  const storeObject = store.getState()

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username,
  }

  let response = {}

  await axios.post(`${BACKEND_URL}/api/company`, values, { headers: headers }).then(
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

// export const getAllAccessories = async (query) => {
//   const storeObject = store.getState()

//   const headers = {
//     token: storeObject.auth.token,
//     username: storeObject.auth.username,
//   }

//   let response = {}

//   await axios.get(`${BACKEND_URL}/api/accessories`, { headers: headers, params: { } }).then(
//     resp => {
//       response = resp
//     }
//   ).catch((error) => {
//     if (error.response) {
//       response = error.response
//     } else {
//       console.log('Error', error.message);
//     }
//   })
//   return response
// } 