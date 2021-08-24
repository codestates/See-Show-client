import React from "react";
import { Link } from "react-router-dom";
import "./css/Nav.css";

function Nav(props) {
  const { isLogin, handleLogout, handleUserinfo} = props;
  if (!isLogin) {
    return (
      <div className="headerWrapper">
        <div className="logoWrapper">
            <Link to="/"><img id="head-logo" src="/resource/seeshow_logo_full_prototype.png" alt="See SHOW" /></Link>
        </div>

        <div className='buttonWrapper'>
            <Link to="/show"><button className="btn-default">SHOW list</button></Link>
            <Link to="/login"><button className="btn-default">LOGIN</button></Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className="headerWrapper-logged">
        <div className="logoWrapper">
           <Link to="/show"> <img id="head-logo" src="/resource/seeshow_logo_full_prototype.png" alt="See SHOW" /> </Link>
        </div>

        <div className="buttonWrapper">
        <div className="dropdown">
          <div className="dropWrapper">
            <button className="btn-default">MENU</button>
            <ul className="sub">
              <li>
                <Link to='/addshow'>신규등록</Link>
                <Link to='/show'>공연 리스트</Link>
                <Link to='/mypage' onClick={handleUserinfo}>마이페이지</Link>
                <Link to='/' onClick={handleLogout}>로그아웃</Link>
              </li>
            </ul>
          </div>
        </div>
        </div>

      </div>
    );
  }
}

export default Nav;
