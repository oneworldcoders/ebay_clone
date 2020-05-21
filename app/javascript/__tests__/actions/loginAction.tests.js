import { enableFetchMocks } from 'jest-fetch-mock'
enableFetchMocks()

import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { LOGIN_SUCCESS, LOGIN_FAILURE } from '../../actions/types';
import Datastore from '../../datastore';
import { loginAction, loginSuccess, loginFailure } from "../../actions/loginAction";
import { MockTokenStore, MockUserDataStore} from '../../__mocks__/mockDataStore';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const datastore = new Datastore(new MockTokenStore(), new MockUserDataStore())

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
    const loginResponse = { user: { firstname: 'firstname' } }

    fetch.mockResponseOnce(JSON.stringify(loginResponse))

    const expectedActions = [
      { type: LOGIN_SUCCESS, json: loginResponse}
    ]

    const store = mockStore()
    store.dispatch(loginAction({})).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })

    expect(fetch.mock.calls.length).toEqual(1)
    expect(fetch.mock.calls[0][0]).toEqual('/login')
  })

  it('dispatches a login failure', async () => {
    const error = { errors: 'invalid credentials' }

    fetch.mockResponseOnce(JSON.stringify(error))

    const expectedActions = [
      { type: LOGIN_FAILURE, error: error.errors }
    ]

    const store = mockStore()
    store.dispatch(loginAction({}, datastore)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })

    expect(fetch.mock.calls.length).toEqual(1)
    expect(fetch.mock.calls[0][0]).toEqual('/login')
  })

  it('sets the token in the datastore', () => {
    const loginResponse = { user: { firstname: 'firstname' }, token: '1234' }

    fetch.mockResponseOnce(JSON.stringify(loginResponse))
    const store = mockStore()
    store.dispatch(loginAction({}, datastore)).then(() => {
      expect(datastore.get('token')).toEqual('1234')
    })
  })
});
