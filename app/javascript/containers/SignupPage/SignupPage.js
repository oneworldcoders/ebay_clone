import React from "react";
import SignupForm from "../../components/Signup/SignupForm";
import ebayBanner from "../../assets/images/ebay-banner-mini.png";
import "./SignupPage.css";

const SignupPage = () => {
  return (
    <div className="container">
      <div>
        <img className="mini-banner" src={ebayBanner} alt="mini banner" />
      </div>
      <div className="signup-txt">
        <h2>Signup</h2>
      </div>
      <SignupForm />
    </div>
  );
}

export default SignupPage;
