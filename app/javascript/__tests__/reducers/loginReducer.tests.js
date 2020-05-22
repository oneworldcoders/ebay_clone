import loginReducer from "../../reducers/loginReducer";
import { LOGIN_SUCCESS, LOGOUT_SUCCESS, LOGIN_FAILURE } from "../../actions/types";
import { INITIAL_STATE } from "../../configureStore";

describe("login reducer", () => {
  let action;
  beforeEach(() => {
    action = {
      type: LOGIN_SUCCESS,
      json: { user: { firstname: 'user'} }
    };
  });

  it("login state sets to successful", () => {
    const newState = loginReducer({}, action);
    expect(newState.login).toEqual('login succesful');
  });

  it("firstname state sets to the user", () => {
    const newState = loginReducer({}, action);
    expect(newState.firstname).toEqual('user');
  });

  it("loggedin state sets to true", () => {
    const newState = loginReducer({}, action);
    expect(newState.loggedin).toEqual(true);
  });
});

describe("logout", () => {
  let action;
  beforeEach(() => {
    action = {
      type: LOGOUT_SUCCESS
    };
  });

  it("resets to the initial state", () => {
    const newState = loginReducer({}, action);
    expect(newState.state).toEqual(INITIAL_STATE);
  });

  it("sets the home redirect to true", () => {
    const newState = loginReducer({}, action);
    expect(newState.loginredirect).toEqual(true);
  });
});

describe("login reducer failure", () => {
  let action;
  beforeEach(() => {
    action = {
      type: LOGIN_FAILURE,
      error: 'login failed'
    };
  });

  it("sets an error in state", () => {
    const newState = loginReducer({}, action);
    expect(newState.login).toEqual('login failed');
  });
});
