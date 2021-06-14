import React from "react";
import "./css/Hello.css"

function Hello(props) {
    const {userinfo} = props;
    if(userinfo) {
        // 로그인 되어 있을 때 hello페이지를 더이상 보여주지 않고 ShowPage로 리다이렉션한다.
    } else {
        return (
            <div className="hello-body">
                <div className="greeting">
                  <div className="contentsWrapper">
                    <img id="greeting-logo" src="/resource/seeshow_logo_lite.png" alt="logo" />
                    <div className="subtitle">공연 전시 정보 안내 서비스</div>
                    <div className="title">See SHOW</div>
                  </div>
                </div>
            </div>
        )
    }
}


export default Hello;