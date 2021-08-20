import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css"


function Footer() {

    return(

        <div className="footer">
            <div className="footer-logoarea">
                <img id="footer-logo" src="/resource/seeshow_logo_full_gray.png" />
            </div>

            <div className="footer-infoarea">
                <div className="footer-infoarea-infolabel">
                    Copyright © Team DDH. All rights reserved.
                </div>

                <div className="footer-infoarea-buttonsarea">
                    <Link to="/" className="footer-infoarea-buttonsarea-buttons" >회사소개</Link>
                    <a className="footer-infoarea-buttonsarea-buttons" href="mailto:help@teamddh.com">제휴문의</a>
                    <Link to="/terms-default" className="footer-infoarea-buttonsarea-buttons" >이용약관</Link>
                    <Link to="/terms-local" className="footer-infoarea-buttonsarea-buttons" >개인정보처리방침</Link>
                    <a className="footer-infoarea-buttonsarea-buttons" href="mailto:help@teamddh.com">고객센터</a>
                </div>

                <div className="footer-infoarea-infobody">
                    <div className="footer-infoarea-infobody-line1">
                        <div className="line1-items">(주) 디디에이치 |</div>
                        <div className="line1-items">13988 경기도 안양시 만안구 안양로369번길 33 | </div>
                        <div className="line1-items">고객센터 : help@teamddh.com</div>
                    </div>

                    <div className="footer-infoarea-infobody-line1">
                        <div className="line1-items">사업자등록번호 : 294-50-00750 | </div>
                        <div className="line1-items">대표자 : 성준락</div>
                    </div>
                </div>
            </div>



        </div>








    )

}

export default Footer;