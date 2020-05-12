import { createStore, applyMiddleware, combineReducers } from 'redux'
import loginReducer from './reducers/loginReducer'
import signupReducer from './reducers/signupReducer'
import thunk from 'redux-thunk'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const INITIAL_STATE = {
  thingsReducer: {
    things: [{
      name: 'test',
      guid: '123'
    }]
  },
  loginReducer: {
    login: null,
    loggedin: cookies.get('isLoggedIn'),
    userdata: cookies.get('userdata'),
    token: cookies.get('token')
  },
  signupReducer: {
    signup: null,
    signuperror: null,
    signedup: false
  }
};

const thingsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_THINGS_SUCCESS':
      return {
        ...state,
        things: action.json.things,
      }
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  loginReducer,
  signupReducer,
  thingsReducer
})

export default function configureStore() {
  return createStore(rootReducer, INITIAL_STATE, applyMiddleware(thunk));
}