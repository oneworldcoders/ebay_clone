import React from 'react';
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import Header from '../../components/Header/Header';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../../actions/logoutAction')
import { resetStateAction } from '../../actions/logoutAction';
resetStateAction.mockReturnValue({type: ''})


describe('Header', () => {
  let wrapper;
  let middlewares;
  let mockStore;
  let initialState;
  let store;

  beforeEach(() => {
    middlewares = []
    mockStore = configureMockStore(middlewares)
    
  });

  describe('signed in', () => {
    beforeEach(() => {
      initialState = { 
        loginReducer: { loggedin: true, userdata: { firstname: 'emma'} },
        signoutReducer: {loggedout:  false}
       }
      store = mockStore(initialState)
      wrapper = mount(<Provider store={store}>< BrowserRouter><Header /></ BrowserRouter></Provider>)
    })
    it('renders usernmae when signed in', () => {
      const username = wrapper.find('#username')
      expect(username.text()).toEqual('emma')
    });
  
    it('logs out when signout clicked', () => {
      let signoutButton = wrapper.find('#signout');
      signoutButton.simulate('click')
      expect(resetStateAction).toHaveBeenCalled()
    });
  })

  

  it('renders Login when not signed in', () => {
    initialState = {
      loginReducer: { loggedin: false},
      signoutReducer: {loggedout:  false}
    }
    store = mockStore(initialState)
    wrapper = mount(<Provider store={store}>< BrowserRouter><Header /></ BrowserRouter></Provider>)
    const username = wrapper.find('#username')
    expect(username.text()).toEqual('Login')
  });
});