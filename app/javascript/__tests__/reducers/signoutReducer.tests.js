import { SIGNOUT_SUCCESS } from "../../actions/types";
import signoutReducer from "../../reducers/signoutReducer";

describe("signout reducer", () => {
  let action;
  beforeEach(() => {
    action = {
      type: SIGNOUT_SUCCESS
    };
  });

  it("signout state sets to successful", () => {
    const newState = signoutReducer({}, action);
    expect(newState.logout).toEqual('logout succesful');
  });

  it("signedout state sets to true", () => {
    const newState = signoutReducer({}, action);
    expect(newState.loggedout).toEqual(true);
  });
});
