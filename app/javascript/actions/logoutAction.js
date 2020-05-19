import { LOGOUT_SUCCESS, LOGOUT_FAILURE } from './types';
import Datastore from '../datastore';


const datastore = Datastore()

export function resetStateAction() {
  return (dispatch) => {
    
    const fetchData = {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${datastore.get('token')}`
      }
    }
   
    return fetch('/v1/logout', fetchData)
      .then(response => response.json())
      .then(json => {
        if (json.errors) {
          dispatch(logoutFailure(json.errors))
        } else {
          datastore.clearAll()
          dispatch(logoutSuccess())
        }
      })
      .catch(error => {
        console.log(error)
      })
  }
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