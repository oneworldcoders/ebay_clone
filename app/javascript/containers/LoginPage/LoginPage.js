import React from "react";
import LoginForm from "../../components/Login/LoginForm";
import ebayBanner from "../../assets/images/ebay-banner-mini.png";
import "./LoginPage.css";

export default function LoginPage() {
  return (
    <div className="container">
      <div>
        <img
          className="mini-banner"
          src={ebayBanner}
          alt="mini banner"
        />
      </div>
      <div className="login-txt">
        <h2>Login</h2>
      </div>
      <LoginForm />
    </div>
  );
}
