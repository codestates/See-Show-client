import React from "react";
import {Link } from "react-router-dom";

import SearchedDataListEntry from "./SearchedDataListEntry";
import './SearchedDataList.css'
// import {useLocation} from "react-router";


function SearchedDataList({datas,handleClickedData, resetCheck }){
if(datas.length === 0){
  return(
    <div className="sc-body">
      <img id="btn-goback" src="./resource/back_light_arrow_icon_131562.png" onClick={resetCheck} />
      <div className="searchedlistup-cancel">
      <div className="sc-notice">해당 지역 내에 등록된 공연을 찾을 수 없습니다</div>
      </div>
    </div>

  )
}else{
  return (
    
    <div className="sc-body">
    {/* // <div className="datalistup"> */}
    <img id="btn-goback" src="./resource/back_light_arrow_icon_131562.png" onClick={resetCheck} />
    <div className="searchedlistup">
        
      {datas.map((data) => (
        <SearchedDataListEntry
          data={data}
          key={data.seq}
          handleClickedData={handleClickedData}
        />
      ))}
    </div>
    </div>
  );
}
};



export default SearchedDataList;
