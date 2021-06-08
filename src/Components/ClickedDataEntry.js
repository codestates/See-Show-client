import React from "react";

const ClickedDataEntry = ({ data }) => (
  <div>
    <h1>clickedDataEntry</h1>
    <div className="left_thumbnail 클래스이름 변경해도 됩니다.">
      <img className="media-object" src={data.thumbnail} alt="data.title" />
    </div>

    <div className="right_description">
      <div className="title">{data.title}</div>
      <div className="category">{data.id}</div>
      <div className="runTime">상세정보</div>
      <div className="runPeriod">상세정보</div>
      <div className="schedule">상세정보</div>
      <div className="location">상세정보</div>
      <div className="description">상세정보</div>
    </div>
      <div className="하단 버튼들">
        <button>공연장 위치 보기</button>
        <button>공연장 홈페이지</button>
        <button>티켓 예매</button> 
    </div>
  </div>
);

export default ClickedDataEntry;
