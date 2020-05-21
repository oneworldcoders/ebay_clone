import { toast } from 'react-toastify';
import { SIGNUP_SUCCESS, SIGNUP_FAILURE } from "./types";
import RequestApi from '../requestApi';

const request = new RequestApi('/signup', 'POST')

export function signupAction(signup_data) {
  return async (dispatch) => {
    const json = await request.unAuthenticatedRequest(signup_data)
    if (json.errors) {
      dispatch(signupFailure(json.errors))
    } else {
      dispatch(signupSuccess(json))
      toast.success('Signup succesful')
    }
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