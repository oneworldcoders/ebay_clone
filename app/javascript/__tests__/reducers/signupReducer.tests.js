import signupReducer from "../../reducers/signupReducer";
import { SIGNUP_SUCCESS } from "../../actions/types";

describe("signup reducer", () => {
  let action;
  beforeEach(() => {
    action = {
      type: SIGNUP_SUCCESS
    };
  });

  it("signup state sets to successful", () => {
    const newState = signupReducer({}, action);
    expect(newState.signup).toEqual('signup succesful');
  });

  it("signedup state sets to true", () => {
    const newState = signupReducer({}, action);
    expect(newState.signedup).toEqual(true);
  });
});
