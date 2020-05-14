import React from "react";
import ebayBanner from "../../assets/images/ebay-banner-mini.png";
import "./LandingPage.css";
import HelloWorld from "../../components/HelloWorld";
import Item from "../../components/Item/item";
// import ebayCart from "../../assets/images/ebay-cart.png";


function LandingPage() {
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
          <div className="item-container">
              <Item /><Item /><Item /><Item /><Item /><Item /> <Item /><Item /><Item /><Item /><Item /><Item />
            </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
