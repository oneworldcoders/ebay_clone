import { INITIAL_STATE } from "../configureStore";
import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS, RESET_REDIRECT } from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {    
    case LOGIN_SUCCESS:
      return { 
        ...state,
        login: 'login succesful',
        userdata: action.json.user,
        token: action.json.token,
        homeredirect: true,
        loggedin: true,
        loginredirect: false
      }
    case LOGIN_FAILURE:
      return {
        ...state,
        login: action.error
      }
    case LOGOUT_SUCCESS:
      return {
        state: INITIAL_STATE,
        loginredirect: true
      }
    case RESET_REDIRECT:
      console.log('RESET_REDIRECT');
      
      return {
        ...state,
        loginredirect: false
      }
    default:
      return state;
  }
}