import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import ebayBanner from "../../assets/images/ebay-banner-mini.png";
import "./LandingPage.css";
import Item from "../../components/Item/Item";
import { getProducts } from "../../actions/productAction";

function LandingPage() {

  const dispatch = useDispatch()
  const products = useSelector(state => state.productReducer.products)

  console.log('products', products);
  

  return (
    <div className="container">
      <div>
        <img className="mini-banner" src={ebayBanner} alt="mini banner" />
      </div>
      <div className="welcome-txt">
        <h2>Shop With Us</h2>
      </div>
      <div>
        <div className="col-md-12 form">
          <div className="col-sm-9">
            <div>
            <button onClick={() => dispatch(getProducts())}>Products</button>
            </div>
          </div>
            <div className="item-container">
              {
                products.map((val, index) => {
                  return <Item key={index} {...val}/>;
                })
              }
            </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
