import React from 'react';
import '../pages/ShowPage.css'

//공연 썸네일만 쭈-욱 출력되는 Page.
//ShowPage의 state.apiData에 있는 공연정보 객체 전부 뿌려주는 곳.

const DataListEntry = ({ data, handleClickedData}) => (
    <div className="showBox" onClick = {()=> handleClickedData(data)}>
        <img className="showBox_img"  src={data.thumbnail} alt={data.title} />
    </div>
  )
  
  export default DataListEntry;

 