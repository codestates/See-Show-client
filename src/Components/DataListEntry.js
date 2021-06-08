import React from 'react';

const DataListEntry = ({ data, handleClickedData}) => (
    <div className="" onClick = {()=> handleClickedData(data)}>
        <img className=""  src={data.thumbnail} alt={data.title} />
    </div>
  )
  
  export default DataListEntry;