import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from "./types";

export function loginAction(login_data) {
  return (dispatch) => {
    dispatch({ type: LOGIN_REQUEST })
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
          dispatch(loginSuccess(json))
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