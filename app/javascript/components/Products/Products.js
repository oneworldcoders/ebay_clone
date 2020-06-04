import React from "react"
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from 'react-infinite-scroll-component';
import Item from "../Item/Item";
import { getProducts } from "../../actions/productAction";
import "./Products.css";

function Products() {

  const dispatch = useDispatch()

  const products = useSelector(state => state.productReducer.products)
  const pageNumber = useSelector(state => state.productReducer.pagenumber)
  const lastPage = useSelector(state => state.productReducer.lastpage)

  const displayProducts = (products) => {
    return products.map((val, index) => {
      return <Item key={index} {...val} />;
    })
  }

  return (
    <div>
      <div className="col-md-12 form">
        <div className="col-sm-9">
          <div>
            <button onClick={() => dispatch(getProducts({pageNumber}))}>Products</button>
          </div>
        </div>
        <InfiniteScroll
          dataLength={products.length}
          next={() => dispatch(getProducts({pageNumber}))}
          hasMore={lastPage}
          loader={<h4>...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }>
          <div className="item-container">
            { displayProducts(products) }
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
}
export default Products;
