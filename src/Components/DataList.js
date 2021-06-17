import React from "react";
import DataListEntry from "./DataListEntry";
import './DataList.css'

const DataList = ({ datas, handleClickedData }) => {


  return (
    <div className="datalistup">
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
