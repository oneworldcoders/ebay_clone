import { GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAILURE, ADD_PAGE_NUMBER } from '../actions/types'

export default function(state = {}, action) {
  switch (action.type) {
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: state.products.concat(action.json.products),
        pagenumber: action.pageNumber,
        lastpage: action.json.last_page
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