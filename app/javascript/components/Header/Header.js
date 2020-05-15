import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { useSelector, useDispatch } from "react-redux";

import { resetStateAction } from "../../actions/logoutAction";



function Header() {

  const isLoggedIn = useSelector(state => state.loginReducer.loggedin)
  const userdata = useSelector(state => state.loginReducer.userdata)

  const dispatch = useDispatch()

  if(isLoggedIn){
    return(
      <div className="header container">
        <div className="ebay">
          <Link to="/" className="navlink">
            EBay
          </Link>
        </div>
        <div className="auth">
          <span id='username' className='clickable'>{ userdata.firstname }</span>
          <span id='signout' className="navlink clickable" onClick={()=>{dispatch(resetStateAction())}}>
            Signout 
          </span>
          {/* <Link to="/about" className="navlink">
            About
          </Link> */}
        </div>
      </div>
    );
  }

  return (
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
        {/* <Link to="/about" className="navlink">
          About
        </Link> */}
      </div>
    </div>
  );
}
export default Header;
