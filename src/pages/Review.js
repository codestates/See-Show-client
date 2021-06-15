import React from "react";


function Review({review}){

    
    return(
        <div>
        <div>{review.username}</div>
        <div>{review.constent}</div>
        <div>{review.point}</div>
        <button>review 수정</button>
        <button >review 삭제</button>
        </div>

    )
}

export default Review;