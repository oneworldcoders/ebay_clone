import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../actions/loginAction";
import { Redirect } from "react-router-dom";

import "./LoginForm.css";

function LoginForm() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const loginStatus = useSelector(state => state.loginReducer.login)
  const redirect = useSelector(state => state.loginReducer.home)

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

  if (redirect) {
    return <Redirect to='/' />;
  }

  return (
    <>
      <div className="container">
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
                    id='email'
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
                    id='password'
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

export default LoginForm;
