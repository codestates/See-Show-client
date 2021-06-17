import React from "react";
import './SearchedDataList.css'

//공연 썸네일만 쭈-욱 출력되는 Page.
//ShowPage의 state.apiData에 있는 공연정보 객체 전부 뿌려주는 곳.

const SearchedDataListEntry = ({ data, handleClickedData }) => (
  <div className="result-body">

  <div className="result-showBox" onClick={() => handleClickedData(data)}>
    <img className="result-showBox_img" src={data.thumbnail} alt={data.title} />


    <div className="result-infoBox">
      <div className="result-title">{data.title}</div>
      <div className="result-rundate">{data.startDate}~{data.endDate}</div>
      <div className="result-place">{data.place}</div>
    </div>
    </div>
  </div>
);

export default SearchedDataListEntry;
