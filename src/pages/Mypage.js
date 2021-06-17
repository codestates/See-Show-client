import React from "react";
import { Route, Redirect, Link } from "react-router-dom";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import "./css/Mypage.css";

function Mypage(props) {
  const { isLogin, WithdrawAccount, handleLogout, userinfo } = props;

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
        title: "회원탈퇴,, 진심입니까?",
        // message: '정말로, 진짜로, 회원 탈퇴 하시겠습니까?',
        buttons: [
          {
            label: "예",
            onClick: () => {
              alert("탈퇴 되었습니다.. 다음에 또 만나요");
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
// userinfo data
    // area: "서울"
// createdAt: "2021-06-16T12:14:51.000Z"
// email: "sjimin684@gmail.com"
// firstcheck: 0
// genre: "기타"
// id: 1
// updatedAt: "2021-06-17T04:33:11.000Z"
// userId: "jimin"
// username: "jimin"

    return (
      <div>
        <center>
          <h1>Mypage</h1>
          <div className="">
            <div className="">username :</div>
            <div className="username">{userinfo.username}</div>
          </div>

          <div className="">
            <div className="">userid :</div>
            <div className="userid">{userinfo.userId}</div>
          </div>

          <div className="">
            <div className="">useremail :</div>
            <div className="useremail">{userinfo.email}</div>
          </div>

          <div className="">
            <div className="">내가 선택한 선호 지역</div>
            <div>{userinfo.area}</div>
            <div className="">내가 선택한 선호 장르</div>
            <div>{userinfo.genre}</div>
            <Link to='/moreinfo'><button>선호 지역과 장르 변경하기</button></Link>
          </div>


          <div className="">
            <div>비밀번호 변경</div>
            <button onClick={ChangePw}>비밀번호 변경</button>
          </div>
          <button onClick={withDraw}>회원 탈퇴</button>
        </center>
      </div>
    );
  }
}



export default Mypage;
