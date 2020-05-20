import React from "react"
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import HelloWorld from "./HelloWorld"
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
            <Route exact path="/" render={() => <Main child={<LandingPage />} />} />
            <Route exact path="/signup" render={() => <Main child={<SignupPage />} /> } />
            <Route exact path="/login" render={(props) => <Main browserProps={props} child={<LoginPage />} /> } /> 
            <Route exact path='/hello' render={() => <Main child={<HelloWorld greeting="Friend" />} /> } />
          </Switch>
        </BrowserRouter>
        <ToastContainer />
      </Provider>
    );
}

export default App
