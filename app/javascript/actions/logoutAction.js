import { LOGOUT_SUCCESS, LOGOUT_FAILURE } from './types';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export function resetStateAction(history) {
  return (dispatch) => {
    Object.keys(cookies.getAll()).forEach((cookie) => {
      cookies.remove(cookie)
    })
    const logout_data = ''
    const fetchData = {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookies.get('token')}`
      },
      body: JSON.stringify(logout_data)
    }
    dispatch(logoutSuccess())
    history.push('/login')
    // return fetch('/logout', fetchData)
    //   .then(response => response.json())
    //   .then(json => {
    //     console.log(json);
    //     if (!json.errors) {
    //       dispatch(logoutSuccess())
    //     } else {
    //       dispatch(logoutFailure(json.errors))
    //     }
    //   })
    //   .catch(error => {
    //     console.log(error)
    //   })
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