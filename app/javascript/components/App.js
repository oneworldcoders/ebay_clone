import React from "react"
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import configureStore from '../configureStore'
import SignupPage from "../containers/SignupPage/SignupPage"
import LandingPage from "../containers/LandingPage/LandingPage"
import LoginPage from "../containers/LoginPage/LoginPage"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Main from "../layouts/Main"


const store = configureStore();

function App() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={() =>  <Main> <LandingPage /> </Main> } />
            <Route exact path="/signup" render={() =>  <Main> <SignupPage /> </Main> } />
            <Route exact path="/login" render={() => <Main> <LoginPage /> </Main> } />
          </Switch>
        </BrowserRouter>
        <ToastContainer />
      </Provider>
    );
}

export default App
