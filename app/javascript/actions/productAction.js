import { toast } from 'react-toastify';
import { GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAILURE } from "./types"
import Datastore from "../datastore"
import RequestApi from "../requestApi"


const request = new RequestApi('/v1/products', 'GET')

export function getProducts(datastore = new Datastore()) {
  return async (dispatch) => {
    const json = await request.authenticatedRequest(datastore.get('token'))
    if (json.unauthenticated) {
      dispatch(getProductsFailure())
      toast.error(json.unauthenticated)
    } else {
      dispatch(getProductsSuccess(json))
    }
  }
}

export function getProductsSuccess(json) {
  return {
    type: GET_PRODUCTS_SUCCESS,
    json
  }
}

export function getProductsFailure() {
  return {  type: GET_PRODUCTS_FAILURE }
}