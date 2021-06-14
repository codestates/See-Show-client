import React from "react";

const Review = ({ review }) => (
    <div className="reviewBox" >
        <div>{review.id}</div>
        <div>{review.text}</div>
    </div>
  )
export default Review ;