import { LOGIN_SUCCESS, LOGIN_FAILURE } from "./types";
import Datastore from "../datastore";

// Try to stub out the datastore for testing
// extract fetch and the headers
const datastore = Datastore()

export function loginAction(login_data) {
  return (dispatch) => {
    const fetchData = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(login_data)
    }
    return fetch('/login', fetchData)
      .then(response => response.json())
      .then(json => {
        if (json.errors) {
          dispatch(loginFailure(json.errors))
        } else {
          datastore.set('userdata', json.user)
          datastore.set('token', json.token)
          datastore.set('isLoggedIn', true)
          dispatch(loginSuccess(json))
        }
      })
      .catch(error => {
        console.log(error)
      })
  }
};

export function loginSuccess(json) {
  return {
    type: LOGIN_SUCCESS,
    json
  }
};

export function loginFailure(error) {
  return {
    type: LOGIN_FAILURE,
    error
  }
};
