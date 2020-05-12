import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../actions/loginAction";
import { Redirect } from "react-router-dom";
import Cookies from 'universal-cookie';

import "./LoginForm.css";

function LoginForm() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const loginStatus = useSelector(state => state.loginReducer.login)
  const isLoggedIn = useSelector(state => state.loginReducer.loggedin)
  const userData = useSelector(state => state.loginReducer.userdata)
  const token = useSelector(state => state.loginReducer.token)

  const dispatch = useDispatch();

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let login_data = {
      email,
      password,
    };
    dispatch(loginAction(login_data))
  };

  console.log('isLoggedIn', isLoggedIn)
  return (
    <>
      <div className="container">
      { isLoggedIn && setCookies(isLoggedIn, userData, token) && <Redirect to='/' />}
        { loginStatus &&
        <div className="col-md-12 form">
          <div className="col-sm-9">
            <div className="alert alert-danger" role="alert">
              {loginStatus}
            </div>
          </div>
        </div>
        }
        <div className="login_tagline">
          <div className="form col-md-12">
            <form onSubmit={handleSubmit}>
              <div className="form-group row">
                <div className="col-sm-9">
                  <input
                    type="text"
                    required
                    className="form-control form-control-lg"
                    placeholder="Email"
                    name="email"
                    onChange={onEmailChange}
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-9">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    name="password"
                    onChange={onPasswordChange}
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-12">
                  <button
                    type="submit"
                    style={{ display: "flex", margin: "auto 11rem" }}
                    className="btn btn-dark btn-lg"
                  >
                    LOGIN
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

const setCookies = (isLoggedIn, userData, token) => {
  const cookies = new Cookies()
  cookies.set('isLoggedIn', isLoggedIn, { path: '/'})
  cookies.set('token', token, { path: '/'})
  cookies.set('userdata', userData, { path: '/'})
  return true;
}

export default LoginForm;
