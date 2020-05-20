import { LOGOUT_SUCCESS, LOGOUT_FAILURE, RESET_REDIRECT } from './types';
import Datastore from '../datastore';
import RequestApi from '../requestApi';


const request = new RequestApi('/v1/logout', 'DELETE')

export function resetStateAction(datastore = new Datastore()) {
  return async (dispatch) => {
    const json = await request.authenticatedRequest(datastore.get('token'))
    if (json.errors) {
      dispatch(logoutFailure(json.errors))
    } else {
      datastore.clearAll()
      dispatch(logoutSuccess())
    }
  }
}

export function resetLoginRedirect() {
  return { type: RESET_REDIRECT}

}

export function logoutSuccess(){
  return { type: LOGOUT_SUCCESS }
}

export function logoutFailure(error){
  return {
    type: LOGOUT_FAILURE,
    error
  }
}