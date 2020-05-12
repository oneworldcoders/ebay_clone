import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupAction } from "../../actions/signupAction";
import { Redirect, useHistory } from "react-router-dom";
import "./SignupForm.css";


function SignupForm() {
  const [firstname, setFirstName] = useState();
  const [lastname, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const signupError = useSelector(state => state.signupReducer.signuperror)

  const dispatch = useDispatch();
  const history = useHistory();

  const onFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };
  const onLastNameChange = (event) => {
    setLastName(event.target.value);
  };
  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    let signup_data = {
      firstname,
      lastname,
      email,
      password,
    };
    dispatch(signupAction(signup_data, history))

  };

  return (
    <>
      <div className="container">
        { signupError &&
        <div className="col-md-12 form">
          <div className="col-sm-9">
            <div className="alert alert-danger" role="alert">
              {signupError[0]}
            </div>
          </div>
        </div>
        }
        <div className="signup_tagline">
          <div className="col-md-12 form">
            <form onSubmit={handleSubmit}>
              <div className="form-group row">
                <div className="col-sm-9">
                  <input
                    type="text"
                    required
                    className="form-control form-control-lg"
                    placeholder="FirstName"
                    name="firstName"
                    onChange={onFirstNameChange}
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-9">
                  <input
                    type="text"
                    required
                    className="form-control form-control-lg"
                    placeholder="LastName"
                    name="lastName"
                    onChange={onLastNameChange}
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-9">
                  <input
                    type="text"
                    required
                    className="form-control form-control-lg"
                    placeholder="Enter email"
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
                    className="btn btn-dark btn-lg">
                    SignUp
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

export default SignupForm;