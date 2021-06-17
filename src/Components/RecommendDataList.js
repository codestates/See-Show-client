import React from "react";
import RecommendDataEntry from "./RecommendDataEntry";
// import './DataList.css'

const RecommendDataList = ({ recommendData, handleClickedData }) => {


  return (
    <div className="datalistup">
      {recommendData.map((data) => (
        <RecommendDataEntry
          data={data}
          key={data.seq}
          handleClickedData={handleClickedData}
        />
      ))}
    </div>
  );
};

export default RecommendDataList;