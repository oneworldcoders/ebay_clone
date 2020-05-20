import { createStore, applyMiddleware, combineReducers } from 'redux'
import loginReducer from './reducers/loginReducer'
import signupReducer from './reducers/signupReducer'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import Datastore from './datastore';

const datastore = new Datastore()

export const INITIAL_STATE = {
  thingsReducer: {
    things: [{
      name: 'test',
      guid: '123'
    }]
  },
  loginReducer: {
    login: null,
    loggedin: datastore.get('isLoggedIn'),
    userdata: datastore.get('userdata'),
    token: datastore.get('token')
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
  return createStore(rootReducer, INITIAL_STATE, composeWithDevTools(applyMiddleware(thunk)));
}