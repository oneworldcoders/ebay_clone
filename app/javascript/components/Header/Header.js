import React from "react";
import { Link, Redirect } from "react-router-dom";
import "./Header.css";
import { useSelector, useDispatch } from "react-redux";

import { resetStateAction } from "../../actions/logoutAction";



function Header() {

  const isLoggedIn = useSelector(state => state.loginReducer.loggedin)
  const userdata = useSelector(state => state.loginReducer.userdata)

  const isLoggedOut = useSelector(state => state.signoutReducer.loggedout)
  
  const dispatch = useDispatch()

  console.log('userdata', userdata);

  if(isLoggedIn){
    return(
      <div className="header container">
         { isLoggedOut && <Redirect to='/signup' />}
        <div className="ebay">
          <Link to="/" className="navlink">
            EBay
          </Link>
        </div>
        <div className="auth">
          <Link to="/login" className="navlink">
            <span id='username'>{ userdata.firstname }</span>
          </Link>
          <span className="navlink clickable" onClick={()=>{dispatch(resetStateAction())}}>
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
