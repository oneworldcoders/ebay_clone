import { INITIAL_STATE } from "../configureStore";
import { LOGIN_SUCCESS, LOGIN_FAILURE } from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {    
    case LOGIN_SUCCESS:
      return { 
        ...state,
        login: 'login succesful',
        userdata: action.json.user,
        token: action.json.token,
        loggedin: true
      }
    case LOGIN_FAILURE:
      return {
        ...state,
        login: action.error
      }
    case 'RESET_REQUEST':
      return {
        state: INITIAL_STATE
      }
    default:
      return state;
  }
}