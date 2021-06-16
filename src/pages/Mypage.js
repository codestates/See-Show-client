import React from "react";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

function Mypage(props) {
  const { userinfo, handleLogout, WithdrawAccount } = props;

  
  //Userinfo의 정보가 없을 시, 로그인 페이지로 리다이렉트.
  //기능테스트를 위해 일시적으로 주석처리함.

  // if (!userinfo) {
  //   return (
  //     <Route>
  //       <Redirect
  //         to={{
  //           pathname: "/login",
  //         }}
  //       />
  //     </Route>
  //   );
  // } else {
    //server-userinfo에 뭐가오는건가...


   const withDraw = () => {
      confirmAlert({
        title: '회원탈퇴,, 진심입니까?',
        // message: '정말로, 진짜로, 회원 탈퇴 하시겠습니까?',
        buttons: [
          {
            label: '예',
            onClick: () => {
              alert('탈퇴 되었습니다.. 다음에 또 만나요') 
              WithdrawAccount()
            }
          },
          {
            label: '아니오',
            onClick: () => alert('탈퇴 취소되었습니다. 저희와 오래 가요~')
          }
        ]
      });
    };

 

  return (
    <div>
      <center>
        <h1>Mypage</h1>
        <div className="userId">userinfo.userId 님</div>
        <div className="Review">내가 작성한 리뷰</div>
      </center>
      <button onClick={withDraw}>회원 탈퇴</button>
    </div>
  );
}
// }

export default Mypage;
