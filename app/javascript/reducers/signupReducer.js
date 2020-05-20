import { SIGNUP_SUCCESS, SIGNUP_FAILURE } from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case SIGNUP_SUCCESS:
      return { 
        ...state,
        signup: 'signup succesful',
        signedup: true,
        home: true
      }
    case SIGNUP_FAILURE:
      return {
        ...state,
        signuperor: action.error
      }
    default:
      return state;
  }
}