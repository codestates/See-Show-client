import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

function Nav(props) {
  const { userinfo, handleLogout } = props;
  if (!userinfo) {
    return (
      <div className="headerWrapper">
        <Link to="/">
          <img
            id="head-logo"
            src="/resource/seeshow_logo_full_prototype.png"
            alt="See SHOW"
          ></img>
        </Link>

        <Link to="/login">
          <button className="btn-default">LOGIN</button>
        </Link>
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
        <button className="btn-default">MY PAGE</button>
        <button className="btn-default" onClick={handleLogout}>
          LOGOUT
        </button>
      </div>
    );
  }
}

export default Nav;
