import React from "react";
import '../pages/ShowPage.css'


//ShowPage에서 공연 썸네일을 클릭했을 때 나오는 '해당 공연 상세 정보' 페이지 입니다.
function ClickedDataEntry ({ data }) {

return(
  <div className = "clicked_showBox">

    {/* 왼쪽 공연 썸네일 */}
    <div className="left_thumbnail ">
      <img className="thumbnail" src={data.thumbnail._text} alt="data.title" />
    </div>

    {/* 오른쪽 공연 상세 정보 */}
    <div className="right_description">
      <div className="title">
        {data.title._text}</div>
      <div className="category">{data.realmName._text}  </div>
      <div className="runPeriod">{`${data.startDate._text}~${data.endDate._text}`} </div>
      <div className="area">{data.area._text}  </div>
      <div className="place">{data.realmName._text}</div>
      <div className="review">리뷰...</div>
    </div>

    <div className="buttonBox">
      <button>공연장 위치 보기</button>
      <button>공연장 홈페이지</button>
      <button>티켓 예매</button>
    </div>
  </div>)
}

export default ClickedDataEntry;
