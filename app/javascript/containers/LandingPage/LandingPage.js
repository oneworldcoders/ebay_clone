import React from "react";
import { useSelector } from 'react-redux'
import ebayBanner from "../../assets/images/ebay-banner-mini.png";
import "./LandingPage.css";
import HelloWorld from "../../components/HelloWorld";
// import ebayCart from "../../assets/images/ebay-cart.png";

function LandingPage() {
  const signupStatus = useSelector(state => state.signupReducer.signup)

  return (
    <div className="container">
      <div>
        <img className="mini-banner" src={ebayBanner} alt="mini banner" />
      </div>
      <div className="welcome-txt">
        <h2>Shop With Us</h2>
      </div>
      <div>
        {/* <img
          className="large-banner"
          src={ebayCart}
          alt="large banner"
        /> */}
      
        <div className="col-md-12 form">
          <div className="col-sm-9">
            This is the landing Page
            <div>
            <HelloWorld />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
