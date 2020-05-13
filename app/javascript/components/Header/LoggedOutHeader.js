import React from "react";
import { Link } from "react-router-dom";


function LoggedOutHeader() {
  return(
    <div className="header container">
    <div className="ebay">
      <Link to="/" className="navlink">
        EBay
      </Link>
    </div>
    <div className="auth">
      <Link to="/login" className="navlink">
      <span id='username'>Login</span>
      </Link>
      <Link to="/signup" className="navlink">
        Signup
      </Link>
    </div>
  </div>
  );
}

export default LoggedOutHeader;