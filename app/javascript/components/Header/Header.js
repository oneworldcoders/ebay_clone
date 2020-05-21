import React from "react";
import { Redirect, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import LoggedInHeader from "./LoggedInHeader";
import LoggedOutHeader from "./LoggedOutHeader";
import "./Header.css";


function Header() {

  const isLoggedIn = useSelector(state => state.loginReducer.loggedin)
  // const userdata = useSelector(state => state.loginReducer.userdata)
  const firstname = useSelector(state => state.loginReducer.firstname)
  const redirect = useSelector(state => state.loginReducer.loginredirect)
  const location = useLocation()

  if(redirect && location.pathname != '/login' ) {
    return <Redirect to='/login' />
  }

  if(isLoggedIn){
    return <LoggedInHeader firstname={firstname} />
  }

  return <LoggedOutHeader />
}
export default Header;
