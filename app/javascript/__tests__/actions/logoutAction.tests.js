import { enableFetchMocks } from 'jest-fetch-mock'
enableFetchMocks()
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { logoutSuccess, logoutFailure, clearCookies, resetStateAction } from '../../actions/logoutAction'
import { LOGOUT_SUCCESS, LOGOUT_FAILURE } from '../../actions/types'
import Cookies from 'universal-cookie';


describe('logoutAction', () => {
  const middlewares = [thunk]
  const mockStore = configureMockStore(middlewares)

  beforeEach(() => {
    fetch.resetMocks()
  })
  
  it('logoutSuccess returns a success type', () => {
    const actual = logoutSuccess()
    const expected = { type: LOGOUT_SUCCESS }
    expect(actual).toEqual(expected)
  });
  
  it('logoutFailure returns a failure type', () => {
    const error = 'failed to logout'
    const actual = logoutFailure(error)
    const expected = { type: LOGOUT_FAILURE, error: error }
    expect(actual).toEqual(expected)
  });
  
  it('clearCookies deletes all cookies', () => {
    const cookies = new Cookies();
    cookies.set('name', 'Emma');
    cookies.set('tokem', '1234');
    clearCookies();
    const name = cookies.get('name')
    const token = cookies.get('token')
    expect(name).toBeUndefined()
    expect(token).toBeUndefined()
  })

  it('dispatches a logout success', async () => {
    const response = { message: 'logout successful' }
    fetch.mockResponseOnce(JSON.stringify(response))

    const expectedActions = [ { type: LOGOUT_SUCCESS } ]

    const store = mockStore()
    const historyMock = { push: jest.fn() }
    store.dispatch(resetStateAction(historyMock)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })

    expect(fetch.mock.calls.length).toEqual(1)
    expect(fetch.mock.calls[0][0]).toEqual('/v1/logout')
  })

  it('dispatches a logout failure', async () => {
    const error = { errors: 'failed to logout' }
    fetch.mockResponseOnce(JSON.stringify(error))

    const expectedActions = [ { type: LOGOUT_FAILURE,  error: error.errors } ]

    const store = mockStore()
    const historyMock = { push: jest.fn() }
    store.dispatch(resetStateAction(historyMock)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })

    expect(fetch.mock.calls.length).toEqual(1)
    expect(fetch.mock.calls[0][0]).toEqual('/v1/logout')
  })

});