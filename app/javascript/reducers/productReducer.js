import { GET_PRODUCTS_SUCCESS } from '../actions/types'

export default function(state = {}, action) {
  switch (action.type) {
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.json.products,
      }
    default:
      return state;
  }
}