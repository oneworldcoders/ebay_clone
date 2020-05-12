import React from 'react';
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import LoginPage from '../../containers/LoginPage/LoginPage';
import { Provider } from 'react-redux'
import LoginForm from '../../components/Login/LoginForm';
import { BrowserRouter } from 'react-router-dom';


describe('Login Page', () => {
  let wrapper;
  beforeEach(() => {
    const middlewares = []
    const mockStore = configureMockStore(middlewares)
    const initialState = { loginReducer: {} }
    const store = mockStore(initialState)
    wrapper = mount(<Provider store={store}><BrowserRouter><LoginPage /></BrowserRouter></Provider>)
  });

  test('renders a login form', () => {
    expect(wrapper.find(LoginForm).length).toBe(1)
  });
});
