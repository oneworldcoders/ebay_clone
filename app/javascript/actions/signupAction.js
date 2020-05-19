import { toast } from 'react-toastify';
import { SIGNUP_SUCCESS, SIGNUP_FAILURE } from "./types";

export function signupAction(signup_data) {
  
  return async (dispatch) => {
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
        if (json.errors) {
          dispatch(signupFailure(json.errors))
        } else {
          dispatch(signupSuccess(json))
          toast.success('Signp succesful')
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