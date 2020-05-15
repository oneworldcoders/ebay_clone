import React from 'react';
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import HelloWorld from '../components/HelloWorld';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk'

import SignupForm from '../../components/Signup/SignupForm';

jest.mock('../../actions/signupAction')
import { signupAction } from '../../actions/signupAction';
signupAction.mockReturnValue({type: ''})


describe('HelloWorld', () => {
  let wrapper;
  beforeEach(() => {
    const middlewares = []
    const mockStore = configureMockStore(middlewares)
    const initialState = { things: []}
    const store = mockStore(initialState)
    wrapper = mount(<Provider store={store}><HelloWorld /></Provider>)
  });

  test('renders a button element', () => {
    expect(wrapper.find('button').length).toBe(1)
    const mockStore = configureMockStore([thunk])
    const initialState = { signupReducer : {} 
  }
    const store = mockStore(initialState)
    wrapper = mount(<Provider store={store}><BrowserRouter><SignupForm /></BrowserRouter></Provider>)
  });

  it('signupAction to have been called by submit', () => {
    wrapper.find('form').simulate('submit', { preventDefault: () => {} })
    expect(signupAction).toHaveBeenCalled()
  });

  it('submits empty signup data', () => {
    wrapper.find('form').simulate('submit', { preventDefault: () => {} })
    const signupdata = { firstname: undefined, lastname: undefined, email: undefined, password: undefined };
    expect(signupAction).toHaveBeenCalledWith(signupdata)
  });

  it('submits login data', () => {
    let firstname = wrapper.find('#firstname');
    let lastname = wrapper.find('#lastname');
    let email = wrapper.find('#email');
    let password = wrapper.find('#password');

    firstname.simulate('change', { target: { value: 'firstname' } })
    lastname.simulate('change', { target: { value: 'lastname' } })
    email.simulate('change', { target: { value: 'email@email.com' } })
    password.simulate('change', { target: { value: 'password' } })

    wrapper.find('form').simulate('submit', { preventDefault: () => {} })
    const signupdata = { firstname: 'firstname', lastname: 'lastname', email: 'email@email.com', password: 'password' };
    expect(signupAction).toHaveBeenCalledWith(signupdata)
  });
});
