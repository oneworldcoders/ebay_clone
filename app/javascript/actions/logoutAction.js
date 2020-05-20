import { LOGOUT_SUCCESS, LOGOUT_FAILURE } from './types';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export function resetStateAction(history) {
  return (dispatch) => {
    
    const fetchData = {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookies.get('token')}`
      }
    }
   
    return fetch('/v1/logout', fetchData)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        if (!json.errors) {
          clearCookies()
          dispatch(logoutSuccess())
          history.push('/login')
        } else {
          dispatch(logoutFailure(json.errors))
        }
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export function clearCookies() {
  Object.keys(cookies.getAll()).forEach((cookie) => {
    cookies.remove(cookie)
  })
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