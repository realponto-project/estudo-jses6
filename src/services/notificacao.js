import axios from 'axios'
import { BACKEND_URL } from './var'
import { store } from '../App'

export const notifications = async (query) => {
const storeObject = store.getState()

const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username,
}

let response = {}

await axios.get(`${BACKEND_URL}/api/notification`, { headers: headers, params: { query } }).then(
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

export const hasNotifications = async () => {
    const storeObject = store.getState()
    
    const headers = {
        token: storeObject.auth.token,
        username: storeObject.auth.username,
    }
    
    let response = {}
    
    await axios.get(`${BACKEND_URL}/api/notification/has`, { headers: headers }).then(
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