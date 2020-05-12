import { SIGNUP_SUCCESS, SIGNUP_FAILURE } from "../actions/types";
import { INITIAL_STATE } from "../configureStore";

export default function(state = {}, action) {
  switch (action.type) {
    case SIGNUP_SUCCESS:
      return { 
        ...state,
        signup: 'signup succesful',
        signedup: true
      }
    case SIGNUP_FAILURE:
      return {
        ...state,
        signup: action.error
      }
    default:
      return state;
  }
}