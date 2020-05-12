import { LOGIN_SUCCESS, LOGIN_FAILURE } from "./types";
import Cookies from 'universal-cookie';


export function loginAction(login_data, history) {
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
        console.log(json);
        if (!json.errors) {
          setCookies(json.user, json.token) 
          dispatch(loginSuccess(json))
          history.push('/')
        } else {
          dispatch(loginFailure(json.errors))
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

const setCookies = (userData, token) => {
  const cookies = new Cookies()
  cookies.set('token', token, { path: '/'})
  cookies.set('userdata', userData, { path: '/'})
  return true;
}