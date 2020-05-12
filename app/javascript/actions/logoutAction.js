import { SIGNOUT_REQUEST, SIGNOUT_SUCCESS, SIGNOUT_FAILURE } from './types';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export function resetStateAction() {
  return (dispatch) => {
    console.log('resetAction');
    
    // dispatch({ type: SIGNOUT_REQUEST })
    Object.keys(cookies.getAll()).forEach((cookie) => {
      console.log('deleted ' + cookie);
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
  return { type: SIGNOUT_SUCCESS }
}

export function logoutFailure(error){
  return {
    type: SIGNOUT_FAILURE,
    error
  }
}