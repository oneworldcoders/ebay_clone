import React from 'react';
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import SignupForm from '../../components/Signup/SignupForm';


describe('SignupForm', () => {
  let wrapper;
  beforeEach(() => {
    const middlewares = []
    const mockStore = configureMockStore(middlewares)
    const initialState = { }
    const store = mockStore(initialState)
    wrapper = mount(<Provider store={store}><SignupForm /></Provider>)
  });

  xit('', () => {

  })

});
