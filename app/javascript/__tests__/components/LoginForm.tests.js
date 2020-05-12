import React from 'react';
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
// import HelloWorld from '../components/HelloWorld';
import { Provider } from 'react-redux'
import LoginForm from '../../components/Login/LoginForm';


jest.mock('../../actions/loginAction')
import { loginAction } from '../../actions/loginAction';


describe('LoginForm', () => {
  let wrapper;
  let middlewares;
  let mockStore;
  let initialState;
  let store;

  beforeEach(() => {
    middlewares = []
    mockStore = configureMockStore(middlewares)
    initialState = { loginReducer: {} }
    store = mockStore(initialState)
    wrapper = mount(<Provider store={store}><LoginForm /></Provider>)
  });

  xit('submits login data . . .', () => {
    // wrapper.find('form').simulate('submit', { preventDefault: ()=>{} })
    wrapper.find('form').simulate('submit', { preventDefault: () => {} })
    expect(mockStore.dispatch).toHaveBeenCalledWith(loginAction());
    // expect(loginAction).toHaveBeenCalled()
  });
});