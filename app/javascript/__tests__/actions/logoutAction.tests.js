import { enableFetchMocks } from 'jest-fetch-mock'
enableFetchMocks()
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { logoutSuccess, logoutFailure, resetStateAction } from '../../actions/logoutAction'
import { LOGOUT_SUCCESS, LOGOUT_FAILURE } from '../../actions/types'
import Datastore from '../../datastore'


let datastore = Datastore()

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
  
  it('logout deletes token from datastore', () => {
    let token = '1234';
    datastore.set('token', token);
    token = datastore.get('token')
    expect(token).toEqual(token)

    const response = { message: 'logout successful' }
    fetch.mockResponseOnce(JSON.stringify(response))

    const store = mockStore()
    store.dispatch(resetStateAction()).then(() => {
      token = datastore.get('token')
      expect(token).toBeUndefined()
    })
  })

  it('dispatches a logout success', async () => {
    const response = { message: 'logout successful' }
    fetch.mockResponseOnce(JSON.stringify(response))

    const expectedActions = [ { type: LOGOUT_SUCCESS } ]

    const store = mockStore()
    store.dispatch(resetStateAction()).then(() => {
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
    store.dispatch(resetStateAction()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })

    expect(fetch.mock.calls.length).toEqual(1)
    expect(fetch.mock.calls[0][0]).toEqual('/v1/logout')
  })

});