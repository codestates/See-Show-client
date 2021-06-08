import React from "react";

function Mypage(props) {
  const {userinfo, handleLogout} = props;
    if (!userinfo) {
      return ''
    } else {
      return (
        <div>
          <center>
            <h1>Mypage</h1>
            <div className='username'>{userinfo.username}</div>
            <div className='email'>{userinfo.email}</div>
            <div className='mobile'>{userinfo.mobile}</div>
            <button className='btn-logout' onClick={handleLogout}>LOGOUT</button>
          </center>
        </div>
      )
    }
}

export default Mypage;
