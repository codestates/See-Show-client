import React from "react";

const Review = ({ review }) => (
    <div className="reviewBox" >
        <div>{review.id}</div>
        <div>{review.content}</div>
        <div>{review}</div>
    </div>
  )
export default Review ;