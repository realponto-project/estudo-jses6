import axios from "axios";
import { BACKEND_URL } from "./var";
import { store } from "../App";

export const addEprestimo = async value => {
  const storeObject = store.getState();

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username
  };

  let response = {};

  await axios
    .post(`${BACKEND_URL}/api/emprestimo`, value, { headers: headers })
    .then(resp => {
      response = resp;
    })
    .catch(error => {
      if (error.response) {
        response = error.response;
      } else {
        console.log("Error", error.message);
      }
    });
  return response;
};

export const getEprestimoService = async query => {
  const storeObject = store.getState();

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username
  };

  let response = {};

  await axios
    .get(`${BACKEND_URL}/api/emprestimo`, {
      headers: headers,
      params: { query }
    })
    .then(resp => {
      response = resp;
    })
    .catch(error => {
      if (error.response) {
        response = error.response;
      } else {
        console.log("Error", error.message);
      }
    });
  return response;
};

export const deleteEmprestimoService = async id => {
  const storeObject = store.getState();

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username
  };

  let response = {};

  await axios
    .delete(`${BACKEND_URL}/api/emprestimo`, {
      headers: headers,
      params: { id }
    })
    .then(resp => {
      response = resp;
    })
    .catch(error => {
      if (error.response) {
        response = error.response;
      } else {
        console.log("Error", error.message);
      }
    });
  return response;
};
