import { createStore, applyMiddleware, combineReducers } from 'redux'
import loginReducer from './reducers/loginReducer'
import signupReducer from './reducers/signupReducer'
import productReducer from './reducers/productReducer'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import Datastore from './datastore';

const datastore = new Datastore()

export const INITIAL_STATE = {
  loginReducer: {
    login: null,
    loggedin: datastore.get('isLoggedIn'),
    firstname: datastore.get('firstname'),
    token: datastore.get('token')
  },
  signupReducer: {
    signup: null,
    signuperror: null,
    signedup: false
  },
  productReducer: {
    products: null
  }
};

const rootReducer = combineReducers({
  loginReducer,
  signupReducer,
  productReducer,
})

export default function configureStore() {
  return createStore(rootReducer, INITIAL_STATE, composeWithDevTools(applyMiddleware(thunk)));
}