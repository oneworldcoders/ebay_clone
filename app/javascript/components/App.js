import React from "react"
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import HelloWorld from "./HelloWorld"
import configureStore from '../configureStore'
import SignupPage from "../containers/SignupPage/SignupPage"
import LandingPage from "../containers/LandingPage/LandingPage"
import Header from "./Header/Header"
import LoginPage from "../containers/LoginPage/LoginPage"
import "bootstrap/dist/css/bootstrap.min.css";


const store = configureStore();

function App() {
    return (
      <Provider store={store}>
        <BrowserRouter>
        <Header />
          <Switch>
            <Route exact path="/" render={() => <LandingPage />} />
            <Route exact path="/signup" render={() => <SignupPage />} />
            <Route exact path="/login" render={() => <LoginPage />} />
            <Route exact path='/hello' render={() => <HelloWorld greeting="Friend" />} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
}

export default App
