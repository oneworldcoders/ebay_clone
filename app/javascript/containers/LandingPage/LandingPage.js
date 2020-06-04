import React from "react";
import ebayBanner from "../../assets/images/ebay-banner-mini.png";
import "./LandingPage.css";
import Products from "../../components/Products/Products";

function LandingPage() {

  return (
    <div className="container">
      <div>
        <img className="mini-banner" src={ebayBanner} alt="mini banner" />
      </div>
      <div className="welcome-txt">
        <h2>Shop With Us</h2>
      </div>
      <Products />
    </div>
  );
}

export default LandingPage;
