import { LOGIN_SUCCESS, LOGIN_FAILURE } from "./types";
import Datastore from "../datastore";
import RequestApi from '../requestApi';

const request = new RequestApi('/login', 'POST');

export function loginAction(login_data, datastore = new Datastore()) {
  return async (dispatch) => {
    const json = await request.unAuthenticatedRequest(login_data)
    
    if (json.errors) {
      dispatch(loginFailure(json.errors))
    } else {
      datastore.set('userdata', json.user)
      datastore.set('token', json.token)
      datastore.set('isLoggedIn', true)
      dispatch(loginSuccess(json))
    }
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
