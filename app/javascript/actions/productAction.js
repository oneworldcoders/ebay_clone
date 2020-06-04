import { toast } from 'react-toastify';
import { GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAILURE } from "./types"
import Datastore from "../datastore"
import RequestApi from "../requestApi"


export function getProducts({datastore = new Datastore(), pageNumber=1}) {
  const request = new RequestApi('/v1/products?page='+pageNumber, 'GET')
  return async (dispatch) => {
    const json = await request.authenticatedRequest(datastore.get('token'))
    if (json.unauthenticated) {
      dispatch(getProductsFailure())
      toast.error(json.unauthenticated)
    } else {
      dispatch(getProductsSuccess(json, pageNumber))
    }
  }
}

export function getProductsSuccess(json, pageNumber) {
  return {
    type: GET_PRODUCTS_SUCCESS,
    products: json.products,
    pageNumber: ++pageNumber
  }
}

export function getProductsFailure() {
  return {  type: GET_PRODUCTS_FAILURE }
}