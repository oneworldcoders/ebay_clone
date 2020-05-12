import React from 'react';
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import SignupPage from '../../containers/SignupPage/SignupPage';
import SignupForm from '../../components/Signup/SignupForm';


describe('Signup page', () => {
  let wrapper;
  beforeEach(() => {
    const middlewares = []
    const mockStore = configureMockStore(middlewares)
    const initialState = { signupReducer: {} }
    const store = mockStore(initialState)
    wrapper = mount(<Provider store={store}><SignupPage /></Provider>)
  });

  test('renders a SIGNUP form', () => {
    expect(wrapper.find(SignupForm).length).toBe(1)
  });
});
