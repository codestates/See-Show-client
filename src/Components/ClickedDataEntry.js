import React from "react";

//ShowPage에서 공연을 클릭했을 때 나오는 '공연 상세 정보' 페이지 입니다.
const ClickedDataEntry = ({ data }) => (
  <div>
    <div className="left_thumbnail 클래스이름 변경해도 됩니다.">
      <img className="media-object" src={data.thumbnail} alt="data.title" />
    </div>
    <div className="right_description">
      <div className="title">{data.title}</div>
      <div className="category">카테고리 </div>
      <div className="runTime">상영시간  </div>
      <div className="runPeriod">공연기간  </div>
      <div className="schedule">공연시간  </div>
      <div className="place">{`공연장소 ${data.place}`}</div>
      <div className="description">공연정보  </div>
    </div>
    <div className="하단 버튼들">
      <button>공연장 위치 보기</button>
      <button>공연장 홈페이지</button>
      <button>티켓 예매</button>
    </div>
  </div>
);

export default ClickedDataEntry;
