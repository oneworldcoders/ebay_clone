import { SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE } from "./types";

export function signupAction(signup_data) {
  
  return async (dispatch) => {
    dispatch({ type: SIGNUP_REQUEST })
    const fetchData = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(signup_data)
    }
    return await fetch('/signup', fetchData)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        if (!json.errors) {
          dispatch(signupSuccess(json))
        } else {
          dispatch(signupFailure(json.errors))
        }
      })
      .catch(error => {
        console.log(error)
      })
  }
};

export function signupSuccess(json) {
  return {
    type: SIGNUP_SUCCESS,
    json
  }
};

export function signupFailure(error) {
  return {
    type: SIGNUP_FAILURE,
    error
  }
};