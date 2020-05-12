import { logoutSuccess, logoutFailure } from '../../actions/logoutAction'
import { SIGNOUT_SUCCESS, SIGNOUT_FAILURE } from '../../actions/types'

describe('logoutAction', () => {

  it('logoutAction returns a success type', () => {
    const actual = logoutSuccess()
    const expected = { type: SIGNOUT_SUCCESS }
    expect(actual).toEqual(expected)
  });

  it('logoutAction returns a failure type', () => {
    const error = 'failed to logout'
    const actual = logoutFailure(error)
    const expected = { type: SIGNOUT_FAILURE, error: error }
    expect(actual).toEqual(expected)
  });

});