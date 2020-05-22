import React from 'react';
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import Header from '../../components/Header/Header';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../../actions/logoutAction')
import { resetStateAction } from '../../actions/logoutAction';
import LoggedOutHeader from '../../components/Header/LoggedOutHeader';
import LoggedInHeader from '../../components/Header/LoggedInHeader';
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
        loginReducer: { loggedin: true, firstname: 'emma' },
       }
      store = mockStore(initialState)
      wrapper = mount(<Provider store={store}>< BrowserRouter><Header /></ BrowserRouter></Provider>)
    })

    it('renders the logged in header', () => {
      const loggedInHeader = wrapper.find(LoggedInHeader)
      expect(loggedInHeader.length).toEqual(1)
    })

    it('renders username when signed in', () => {
      const username = wrapper.find('#username')
      expect(username.text()).toEqual('emma')
    });
  
    it('logs out when signout clicked', () => {
      let signoutButton = wrapper.find('#signout');
      signoutButton.simulate('click')
      expect(resetStateAction).toHaveBeenCalled()
    });
  })

  describe('logged out user', () => {
    beforeEach(() => {
      initialState = { loginReducer: { loggedin: false} }
      store = mockStore(initialState)
      wrapper = mount(<Provider store={store}>< BrowserRouter><Header /></ BrowserRouter></Provider>)
    })

    it('renders Login text', () => {
      const username = wrapper.find('#username')
      expect(username.text()).toEqual('Login')
    });

    it('renders the logged out header', () => {
      const loggedInHeader = wrapper.find(LoggedOutHeader)
      expect(loggedInHeader.length).toEqual(1)
    })
  });
});