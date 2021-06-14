import React from "react";


function Review({review}){
    return(
        <div>
        <div>{review.username}</div>
        <div>{review.constent}</div>
        </div>

    )
}

export default Review