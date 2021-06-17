import React from "react";
import { Link } from "react-router-dom";
import "./css/Nav.css";

function Nav(props) {
  const { isLogin, handleLogout, handleUserinfo} = props;
  if (!isLogin) {
    return (
      <div className="headerWrapper">
        <Link to="/">
          <img
            id="head-logo"
            src="/resource/seeshow_logo_full_prototype.png"
            alt="See SHOW"
          ></img>
        </Link>

        <div className='buttonWrapper'>
            <Link to="/login"><button className="btn-default">LOGIN</button></Link>
            {/* <Link to="/show"><button className="btn-default" >SHOW</button></Link> */}
        </div>
      </div>
    );
  } else {
    return (
      <div className="headerWrapper">
       <Link to="/">
          <img
            id="head-logo"
            src="/resource/seeshow_logo_full_prototype.png"
            alt="See SHOW"
          ></img>
        </Link>
        <div className='buttonWrapper'>
            <Link to='/addshow'> <button className="btn-default">Add show</button> </Link>
            <Link to="/show"><button className="btn-default">SHOW list</button></Link>
             <Link to="/mypage"><button className="btn-default">MY PAGE</button></Link>
        <button className="btn-default" onClick={handleLogout}>LOGOUT</button>
        </div>
      </div>
    );
  }
}

export default Nav;
