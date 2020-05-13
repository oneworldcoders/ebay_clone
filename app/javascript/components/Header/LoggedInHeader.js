import React from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { resetStateAction } from "../../actions/logoutAction";

function LoggedInHeader(props) {

  const dispatch = useDispatch()
  const history = useHistory()
  
  return(
    <div className="header container">
      <div className="ebay">
        <Link to="/" className="navlink">EBay</Link>
      </div>
      <div className="auth">
        <span id='username' className='clickable'>{ props.firstname }</span>
        <span className="navlink clickable" onClick={()=>{dispatch(resetStateAction(history))}}>
          Signout 
        </span>
      </div>
    </div>
  );
}

export default LoggedInHeader;