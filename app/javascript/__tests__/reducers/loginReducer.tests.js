import loginReducer from "../../reducers/loginReducer";
import { LOGIN_SUCCESS } from "../../actions/types";

describe("login reducer", () => {
  let action;
  beforeEach(() => {
    action = {
      type: LOGIN_SUCCESS,
      json: { user: 'user'}
    };
  });

  it("login state sets to successful", () => {
    const newState = loginReducer({}, action);
    expect(newState.login).toEqual('login succesful');
  });

  it("userdata state sets to the user", () => {
    const newState = loginReducer({}, action);
    expect(newState.userdata).toEqual('user');
  });

  it("loggedin state sets to true", () => {
    const newState = loginReducer({}, action);
    expect(newState.loggedin).toEqual(true);
  });
});

describe("login reducer failure", () => {
  let action;
  beforeEach(() => {
    action = {
      type: 'LOGIN_FAILURE',
      error: 'login failed'
    };
  });

  it("sets an error in state", () => {
    const newState = loginReducer({}, action);
    expect(newState.login).toEqual('login failed');
  });
});
