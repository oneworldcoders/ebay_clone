import React from 'react';
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';

import InfiniteScroll from 'react-infinite-scroll-component'
import Products from '../../components/Products/Products';
import Item from '../../components/Item/Item';


describe('Products', () => {
  let wrapper;
  let middlewares;
  let mockStore;
  let initialState;
  let store;

  beforeEach(() => {
    middlewares = []
    mockStore = configureMockStore(middlewares)

    initialState = {
      productReducer: { products: [''], pagenumber: 0, lastpage: true }
    }
    store = mockStore(initialState)
    wrapper = mount(<Provider store={store}>< BrowserRouter><Products /></ BrowserRouter></Provider>)

  });

  it('renders the infinite scroll component', () => {
    const infiniteScroll = wrapper.find(InfiniteScroll)
    expect(infiniteScroll.length).toEqual(1)
  })

  it('renders the items', () => {
    const item = wrapper.find(Item)
    expect(item.length).toEqual(1)
  })
});