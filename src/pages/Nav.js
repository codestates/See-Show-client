import React from "react";
import { Link } from "react-router-dom";
import "./css/Nav.css";

function Nav(props) {
  const { isLogin, handleLogout, handleUserinfo } = props;
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
            <Link to="/show"><button className="btn-default" >SHOW</button></Link>

        </div>
      </div>
    );
  } else {
    return (
      <div className="headerWrapper">
        <img
          id="head-logo"
          src="src/resource/seeshow_logo_full_prototype.png"
          alt="See SHOW"
        ></img>
        <Link to="/mypage"><button className="btn-default">MY PAGE</button></Link>
        <Link to="/show"><button className="btn-default">SHOW</button></Link>
        <button className="btn-default" onClick={handleLogout}>
          LOGOUT
        </button>
      </div>
    );
  }
}

export default Nav;
