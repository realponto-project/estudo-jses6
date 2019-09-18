import axios from 'axios'
import { BACKEND_URL } from './var'
import { store } from '../App'


export const newEntrada = async (values) => {
  const storeObject = store.getState()

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username,
  }

  let response = {}

  await axios.post(`${BACKEND_URL}/api/entrance`, values, { headers: headers }).then(
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

export const updateEntrada = async (values) => {
  const storeObject = store.getState()

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username,
  }

  let response = {}

  await axios.put(`${BACKEND_URL}/api/entrance`, values, { headers: headers }).then(
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

export const getEntrada = async (query) => {
  const storeObject = store.getState()

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username,
  }

  let response = {}

  await axios.get(`${BACKEND_URL}/api/entrance`, { headers: headers, params: { query } }).then(
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
