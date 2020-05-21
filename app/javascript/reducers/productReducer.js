import { GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAILURE } from '../actions/types'

export default function(state = {}, action) {
  switch (action.type) {
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.json.products,
      }
      case GET_PRODUCTS_FAILURE:
        return {
          ...state,
          products: [],
        }
    default:
      return state;
  }
}