import React from 'react';
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import HelloWorld from '../components/HelloWorld';
import { Provider } from 'react-redux'


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
  });
});
