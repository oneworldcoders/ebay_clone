import React from "react";
import { useSelector } from "react-redux";

import LoggedInHeader from "./LoggedInHeader";
import LoggedOutHeader from "./LoggedOutHeader";
import "./Header.css";


function Header() {

  const isLoggedIn = useSelector(state => state.loginReducer.loggedin)
  const userdata = useSelector(state => state.loginReducer.userdata)

  if(isLoggedIn){
    return <LoggedInHeader firstname={userdata.firstname} />
  }

  return <LoggedOutHeader />
}
export default Header;
