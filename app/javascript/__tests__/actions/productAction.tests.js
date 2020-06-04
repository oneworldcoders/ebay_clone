import { enableFetchMocks } from 'jest-fetch-mock'
enableFetchMocks()

import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import {  GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAILURE } from '../../actions/types';
import { getProductsSuccess, getProductsFailure, getProducts } from '../../actions/productAction';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('productAction', () => {

  beforeEach(() => {
    fetch.resetMocks()
  })

  describe('productActionSuccess', () => {
    let json;
    let pageNumber;
    let actual;

    beforeEach(() => {
      json = { products: [] }
      pageNumber = 0;
      actual = getProductsSuccess(json, pageNumber)
    })

    it('returns a success type', () => {
      expect(actual.type).toEqual(GET_PRODUCTS_SUCCESS)
    });

    it('returns the products', () => {
      expect(actual.products).toEqual([])
    });

    it('adds the pagenumber', () => {
      expect(actual.pageNumber).toEqual(1)
    });
  
  });
 
  it('productActionFailure returns a failure type', () => {
    const actual = getProductsFailure()
    expect(actual.type).toEqual(GET_PRODUCTS_FAILURE)
  });

  it('dispatches a get products success', async () => {
    const productsResponse = { products: [] }
    const pageNumber = 0;

    fetch.mockResponseOnce(JSON.stringify(productsResponse))

    const expectedActions = [
      { type: GET_PRODUCTS_SUCCESS, products: [], pageNumber: 1}
    ]

    const store = mockStore()
    store.dispatch(getProducts({pageNumber})).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })

    expect(fetch.mock.calls.length).toEqual(1)
    expect(fetch.mock.calls[0][0]).toEqual('/v1/products?page='+pageNumber)
  })

  it('dispatches a get products failure', async () => {
    const error = { unauthenticated: 'you need to be logged in' }
    const pageNumber = 0;

    fetch.mockResponseOnce(JSON.stringify(error))

    const expectedActions = [
      { type: GET_PRODUCTS_FAILURE}
    ]

    const store = mockStore()
    store.dispatch(getProducts({pageNumber})).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })

    expect(fetch.mock.calls.length).toEqual(1)
    expect(fetch.mock.calls[0][0]).toEqual('/v1/products?page='+pageNumber)
  })
});
