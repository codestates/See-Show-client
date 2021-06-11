import React from "react";

function Mypage(props) {
  const { userinfo, handleLogout } = props;
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
  return (
    <div>
      <center>
        <h1>Mypage</h1>
        <div className="userId">userinfo.userId 님</div>
        <div className="Review">내가 작성한 리뷰</div>
      </center>
      <button className="btn-logout" onClick={handleLogout}>
        LOGOUT
      </button>
    </div>
  );
}
// }

export default Mypage;
