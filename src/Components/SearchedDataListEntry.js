import React from "react";
import "./DataList.css";

//공연 썸네일만 쭈-욱 출력되는 Page.
//ShowPage의 state.apiData에 있는 공연정보 객체 전부 뿌려주는 곳.

const SearchedDataListEntry = ({ data, handleClickedData }) => (
  <div className="showBox" onClick={() => handleClickedData(data)}>
    <img className="showBox_img" src={data.thumbnail} alt={data.title} />

    <div className="" style={{ color: "red" }}>
      <div className="" >
        공연 간략 정보
      </div>
      <div className="">{data.title}</div>
      <div className="">{data.startDate}~{data.endDate}</div>
      <div className="">{data.place}</div>
    </div>
  </div>
);

export default SearchedDataListEntry;
