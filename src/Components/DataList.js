import React from 'react';
import DataListEntry from './DataListEntry';


const DataList = ({ datas, handleClickedData }) => {
  if (datas.length === 0) {
    return '로딩 이미지 띄어주면 좋을듯'
  }

  return (
    <div className="">
      {datas.map(data =>
        <DataListEntry data={data} key={data.id} handleClickedData={handleClickedData} />
      )}
    </div>
  )
};

export default DataList;