import React from 'react';
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import LandingPage from '../../containers/LandingPage/LandingPage';
import Item from '../../components/Item/Item';


describe('Landing Page', () => {
  let wrapper;
  let mockStore = configureMockStore([])

  it('renders no item', () => {
    const initialState = { productReducer: { products: [] } }
    const store = mockStore(initialState)
    wrapper = mount(<Provider store={store}><BrowserRouter><LandingPage /></BrowserRouter></Provider>)
    expect(wrapper.find(Item).length).toBe(0)
  });

  it('renders 1 item', () => {
    const initialState = { productReducer: { products: [1] } }
    const store = mockStore(initialState)
    wrapper = mount(<Provider store={store}><BrowserRouter><LandingPage /></BrowserRouter></Provider>)
    expect(wrapper.find(Item).length).toBe(1)
  });

  it('renders multiple items', () => {
    const initialState = { productReducer: { products: [1, 2] } }
    const store = mockStore(initialState)
    wrapper = mount(<Provider store={store}><BrowserRouter><LandingPage /></BrowserRouter></Provider>)
    expect(wrapper.find(Item).length).toBe(2)
  });

  it('renders an item with props', () => {
    let products = [{
      title: 'Test Title',
      subheader: 'Test Sub-header',
      description: 'Test Item description'
    }]
    const initialState = { productReducer: { products: products } }
    const store = mockStore(initialState)
    wrapper = mount(<Provider store={store}><BrowserRouter><LandingPage /></BrowserRouter></Provider>)
    let itemHeader = wrapper.find(CardHeader)
    expect(itemHeader.props().title).toEqual('Test Title')
    expect(itemHeader.props().subheader).toEqual('Test Sub-header')

    let itemTypography = wrapper.find(CardContent)
    expect(itemTypography.text()).toEqual('Test Item description')
  });

  
});
