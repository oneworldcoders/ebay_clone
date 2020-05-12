import { enableFetchMocks } from 'jest-fetch-mock'
enableFetchMocks()

import { loginAction, loginSuccess, loginFailure } from "../../actions/loginAction";
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { LOGIN_SUCCESS, LOGIN_FAILURE } from '../../actions/types';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)


describe('loginAction', () => {

  beforeEach(() => {
    fetch.resetMocks()
  })

  it('loginSuccess returns a success type', () => {
    const data = { email: 'email' }
    const actual = loginSuccess(data)
    const expected = { type: LOGIN_SUCCESS, json: data }
    expect(actual).toEqual(expected)
  });

  it('loginFailure returns a failure type', () => {
    const data = { email: 'email' }
    const actual = loginFailure(data)
    const expected = { type: LOGIN_FAILURE, error: data }
    expect(actual).toEqual(expected)
  });

  it('dispatches a login success', async () => {
    const loginData = { email: 'email', password: 'password' }

    fetch.mockResponseOnce(JSON.stringify(loginData))

    const expectedActions = [
      { type: LOGIN_SUCCESS, json: loginData}
    ]

    const store = mockStore()

    store.dispatch(loginAction(loginData, jest.fn())).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })

    expect(fetch.mock.calls.length).toEqual(1)
    expect(fetch.mock.calls[0][0]).toEqual('/login')
  })

  it('dispatches a login failure', async () => {
    const loginData = { email: 'email', password: 'password' }
    const error = { errors: 'invalid credentials' }

    fetch.mockResponseOnce(JSON.stringify(error))

    const expectedActions = [
      { type: LOGIN_FAILURE, error: error.errors }
    ]

    const store = mockStore()

    store.dispatch(loginAction(loginData, jest.fn())).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })

    expect(fetch.mock.calls.length).toEqual(1)
    expect(fetch.mock.calls[0][0]).toEqual('/login')
  })
});
