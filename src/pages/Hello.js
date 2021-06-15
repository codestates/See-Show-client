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

                <div className="ad">
            <div className='adWrapper'>
            <div className='ad-left-text'>
                <div className='ad-text-title'>어디서나 공연과 전시를 즐기세요</div>
                <div className='ad-text-subtitle'>뮤지컬, 콘서트, 무용, 연극, 전시, 버스킹 등 다양한 공연과 전시를 알아보세요</div>
            </div>
            <div className='ad-right-image'><img id="laptop-gif" src="/resource/laptop.gif"></img></div>
            </div>
            
            <div className='adWrapper'>
            <div className='ad-left-image'><img id="genre-icon" src="/resource/icons/toggle.png"></img></div>
            <div className='ad-right-text'>
                <div className='ad-text-title'>즐겨 보는 장르를 저장하세요</div>
                <div className='ad-text-subtitle'>취향에 맞는 공연과 전시를 추천해 드립니다</div>
            </div>
            </div>

            <div className='adWrapper'>
            <div className='ad-left-text'>
                <div className='ad-text-title'>당신의 위치를 알려주세요</div>
                <div className='ad-text-subtitle'>지금 위치와 가까운 공연과 전시들을 모아 추천해 드립니다</div>
            </div>
            <div className='ad-right-image'><img id="location-icon" src="/resource/icons/near.png"></img></div>
            </div>
            
            <div className='adWrapper'>
            <div className='ad-left-image'><img id="ad-icon" src="/resource/icons/map2.png"></img></div>
            <div className='ad-right-text'>
                <div className='ad-text-title'>공연을 등록하세요</div>
                <div className='ad-text-subtitle'>창작 공연을 준비하거나, 버스킹을 할 예정이신가요?<br />그렇다면 공연을 등록하여 많은 사람들에게 공연을 알리세요</div>
            </div>
            </div>





        </div>


            </div>
        )
    }
}


export default Hello;