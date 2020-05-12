import { logoutSuccess, logoutFailure } from '../../actions/logoutAction'
import { LOGOUT_SUCCESS, LOGOUT_FAILURE } from '../../actions/types'

describe('logoutAction', () => {

  it('logoutAction returns a success type', () => {
    const actual = logoutSuccess()
    const expected = { type: LOGOUT_SUCCESS }
    expect(actual).toEqual(expected)
  });

  it('logoutAction returns a failure type', () => {
    const error = 'failed to logout'
    const actual = logoutFailure(error)
    const expected = { type: LOGOUT_FAILURE, error: error }
    expect(actual).toEqual(expected)
  });

});