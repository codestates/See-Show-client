import React from "react";
import { Route, Redirect, Link } from "react-router-dom";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import "./css/Mypage.css";

function Mypage(props) {
  const { isLogin, WithdrawAccount, handleLogout, userinfo } = props;
console.log(userinfo,'userinfo')
  //Userinfo의 정보가 없을 시, 로그인 페이지로 리다이렉트.
  //기능테스트를 위해 일시적으로 주석처리함.
  // handleUserinfo()

  if (!isLogin) {
    return (
      <Route>
        <Redirect
          to={{
            pathname: "/login",
          }}
        />
      </Route>
    );
  } else {
    //server-userinfo에 뭐가오는건가...

    const withDraw = () => {
      confirmAlert({
        title: "회원탈퇴.. 진심입니까?",
        // message: '정말로, 진짜로, 회원 탈퇴 하시겠습니까?',
        buttons: [
          {
            label: "예",
            onClick: () => {
              // alert("탈퇴 되었습니다.. 다음에 또 만나요");
              WithdrawAccount();
            },
          },
          {
            label: "아니오",
            onClick: () => alert("탈퇴 취소되었습니다. 저희와 오래 가요~"),
          },
        ],
      });
    };

    const ChangePw = () => {
      confirmAlert({
        title: "비밀번호를 변경하시겠습니까?",
        buttons: [
          {
            label: "예",
            onClick: () => {
              handleLogout();
              window.location.href = "/forgotpw";
            },
          },
          {
            label: "아니오",
          },
        ],
      });
    };


    return (
      <div className="mypage-body">
          <div className="mypage-title">마이페이지</div>
        <div className="mypage-container">
          <div className="mypage-contentsWrapper-left">
              <div className="mypage-contents-title">닉네임 </div>
              <div className="mypage-contents-title">아이디 </div>
              <div className="mypage-contents-title">이메일 </div>
              <div className="mypage-contents-title">선호 지역 </div>
              <div className="mypage-contents-title">선호 장르 </div>
          </div>
  
  
          <div className="mypage-contentsWrapper-right">
            <div className="mypage-contents-info">{userinfo.username}</div>
            <div className="mypage-contents-info">{userinfo.nickname}</div>
            <div className="mypage-contents-info">{userinfo.email}</div>
            <div className="mypage-contents-info">{userinfo.area}</div>
            <div className="mypage-contents-info">{userinfo.genre}</div>
          </div>
          </div>

          <div className="mypage-btn-area">
            <Link to='/moreinfo'><button className="mypage-btn">지역/장르 변경</button></Link>
            <button className="mypage-btn" onClick={ChangePw}>비밀번호 변경</button>
            <button className="mypage-btn" onClick={withDraw}>회원 탈퇴</button>
          </div>
      </div>
    );
  }
}



export default Mypage;
