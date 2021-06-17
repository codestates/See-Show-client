import React from "react";
import {Link } from "react-router-dom";

import SearchedDataListEntry from "./SearchedDataListEntry";
import './DataList.css'
// import {useLocation} from "react-router";


function SearchedDataList({datas,handleClickedData, resetCheck }){
// console.log(state.datas)
// const location = useLocation();
// const datas = location.state.datas;
// const handleClickedData = location.state.handleClickedData;

// console.log(location.state)
if(datas.length === 0){
  return(
    <div>
      <button onClick={resetCheck}>추천 공연 리스트 다시보기</button>
      <div style={{ color: "red" }}>해당 지역에는 공연이 없습니다.</div>
    </div>

  )
}else{
  return (
    
    <div>
    {/* // <div className="datalistup"> */}
    <div className="">
        <button onClick={resetCheck}>뒤로가기</button>
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
