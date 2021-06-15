import React from "react";
import DataListEntry from "./DataListEntry";

const DataList = ({ datas, handleClickedData }) => {


  return (
    <div className="">
      {datas.map((data) => (
        <DataListEntry
          data={data}
          key={data.seq}
          handleClickedData={handleClickedData}
        />
      ))}
    </div>
  );
};

export default DataList;
