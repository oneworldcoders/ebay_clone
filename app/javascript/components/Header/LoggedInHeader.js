
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { resetStateAction } from "../../actions/logoutAction";

function LoggedInHeader(props) {

  const dispatch = useDispatch()

  return(
    <div className="header container">
      <div className="ebay">
        <Link to="/" className="navlink">EBay</Link>
      </div>
      <div className="auth">
        <span id='username' className='clickable'>{ props.firstname }</span>
        <span id='signout' className="navlink clickable" onClick={()=>{dispatch(resetStateAction())}}>
          Signout 
        </span>
      </div>
    </div>
  );
}

export default LoggedInHeader;
