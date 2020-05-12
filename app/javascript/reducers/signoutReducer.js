import { SIGNOUT_SUCCESS } from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {    
    case SIGNOUT_SUCCESS:
      return { 
        ...state,
        logout: 'logout succesful',
        loggedout: true
      }
    default:
      return state;
  }
}