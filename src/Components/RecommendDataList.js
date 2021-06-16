import React from "react";
import RecommendDataEntry from "./RecommendDataEntry";

const RecommendDataList = ({ recommendData, handleClickedData }) => {


  return (
    <div className="">
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