import React, { useState } from 'react';
import PopupDom from './PopupDom';
import PopupPostCode from './PopupPostCode';
import './AddShowInput.css'
 
const Test = (props) => {
	// 팝업창 상태 관리
    const [isPopupOpen, setIsPopupOpen] = useState(false)
 
	// 팝업창 열기
    const openPostCode = () => {
        setIsPopupOpen(true)
    }
 
	// 팝업창 닫기
    const closePostCode = () => {
        setIsPopupOpen(false)
    }
 
    return(
        <div>
        	{/* // 버튼 클릭 시 팝업 생성 */}
            <button class="adr-search-btn" type='button' onClick={openPostCode}>주소 검색</button>
            {/* // 팝업 생성 기준 div */}
            <div id='popupDom'>
                {isPopupOpen && (
                    <PopupDom>
                        <PopupPostCode setPlace={props.setPlace}onClose={closePostCode} />
                    </PopupDom>
                )}
            </div>
        </div>
    )
}
 
export default Test;