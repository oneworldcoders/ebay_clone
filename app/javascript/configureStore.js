import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import Datastore from './datastore';

const datastore = Datastore()

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

function rootReducer(state, action) {
  console.log(action.type);
  switch (action.type) {
    case 'GET_THINGS_SUCCESS':
      return {things: action.json.things} 
    default:
      return state;
  }
}

export default function configureStore() {
  return createStore(rootReducer, initialState, applyMiddleware(thunk));
}