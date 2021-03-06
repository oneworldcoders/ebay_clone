import { enableFetchMocks } from 'jest-fetch-mock'
enableFetchMocks()

import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { signupSuccess, signupFailure, signupAction } from '../../actions/signupAction'
import { SIGNUP_SUCCESS, SIGNUP_FAILURE } from '../../actions/types'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)


describe('signupAction', () => {

  beforeEach(() => {
    fetch.resetMocks()
  })

  it('signupAction returns a success type', () => {
    const data = { email: 'email' }
    const actual = signupSuccess(data)
    const expected = { type: SIGNUP_SUCCESS, json: data }
    expect(actual).toEqual(expected)
  });

  it('signupAction returns a failure type', () => {
    const data = { email: 'email' }
    const actual = signupFailure(data)
    const expected = { type: SIGNUP_FAILURE, error: data }
    expect(actual).toEqual(expected)
  });

  it('dispatches a signup success', async () => {
    const signupResponse = { email: 'email', password: 'password' }

    fetch.mockResponseOnce(JSON.stringify(signupResponse))

    const expectedActions = [
      { type: SIGNUP_SUCCESS, json: signupResponse}
    ]

    const store = mockStore()
    store.dispatch(signupAction({})).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })

    expect(fetch.mock.calls.length).toEqual(1)
    expect(fetch.mock.calls[0][0]).toEqual('/signup')
  })

  it('dispatches a signup failure', async () => {
    const signupData = { email: 'email', password: 'password' }
    const error = { errors: 'signup failed' }

    fetch.mockResponseOnce(JSON.stringify(error))

    const expectedActions = [
      { type: SIGNUP_FAILURE, error: error.errors }
    ]

    const store = mockStore()
    store.dispatch(signupAction(signupData)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })

    expect(fetch.mock.calls.length).toEqual(1)
    expect(fetch.mock.calls[0][0]).toEqual('/signup')
  })
});