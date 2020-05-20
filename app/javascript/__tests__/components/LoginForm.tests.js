import React from 'react';
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import LoginForm from '../../components/Login/LoginForm';
import { BrowserRouter } from 'react-router-dom';

import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'

jest.mock('../../actions/loginAction')
import { loginAction } from '../../actions/loginAction';
loginAction.mockReturnValue({type: ''})


describe('LoginForm', () => {
  let wrapper;
  let mockStore;
  let initialState;
  let store;

  beforeEach(() => {
    mockStore = configureStore([thunk])
    initialState = { loginReducer: {} }
    store = mockStore(initialState)
    wrapper = mount(<Provider store={store}><BrowserRouter><LoginForm /></BrowserRouter></Provider>)
  });

  it('loginAction to have been called by submit', () => {
    wrapper.find('form').simulate('submit', { preventDefault: () => {} })
    expect(loginAction).toHaveBeenCalled()
  });

  it('submits empty login data', () => {
    wrapper.find('form').simulate('submit', { preventDefault: () => {} })
    const loginData = { email: undefined, password: undefined };
    expect(loginAction).toHaveBeenCalledWith(loginData)
  });

  it('submits login data', () => {
    let emailField = wrapper.find('#email');
    let passwordField = wrapper.find('#password');

    emailField.simulate('change', { target: { value: 'email@email.com' } })
    passwordField.simulate('change', { target: { value: 'password' } })
    wrapper.find('form').simulate('submit', { preventDefault: () => {} })
    const loginData = { email: 'email@email.com', password: 'password' };
    expect(loginAction).toHaveBeenCalledWith(loginData)
  });
});