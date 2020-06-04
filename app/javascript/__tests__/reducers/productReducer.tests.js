import productReducer from "../../reducers/productReducer";
import { GET_PRODUCTS_SUCCESS } from "../../actions/types";

describe("product reducer", () => {
  let action;
  beforeEach(() => {
    action = {
      type: GET_PRODUCTS_SUCCESS,
      json: { products: ['product 1'] }
    };
  });

  it("products state sets to action", () => {
    const newState = productReducer({ products: [] }, action);
    expect(newState.products).toEqual(['product 1']);
  });

  it("concatenates with the existing products", () => {
    let state = { products: ['product 0'] }
    const newState = productReducer(state, action);
    expect(newState.products).toEqual(['product 0', 'product 1']);
  });
});
