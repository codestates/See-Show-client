import React from "react";
import "../pages/ShowPage.css";
import axios from "axios";
import Review from "../Components/Review"

//ShowPage에서 공연 썸네일을 클릭했을 때 나오는 '해당 공연 상세 정보' 페이지 입니다.
class ClickedDataEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      clickedDataSeq: this.props.clickedDataSeq,
    };
  }

  hanldeClickedApiData = () => {
    //클릭한 공연의 상세 정보 데이터 불러오기.
    const { seq } = this.state.clickedDataSeq;
    axios
      .post("https://localhost:4000/show", seq, {
        //to-do 포스트 주소 변경하기
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
      })
      .then((res) => {
        this.setState({ data: res.body });
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { data } = this.state.data;
    return (
      <div className="clicked_showBox">
        {/* 왼쪽 공연 썸네일 */}
        <div className="left_thumbnail ">
          <img className="thumbnail" src={data.thumbnail} alt="data.title" />
        </div>

        {/* 오른쪽 공연 상세 정보 */}
        <div className="right_description">
          <div className="title">{data.title}</div>
          <div className="category">{data.realmName} </div>
          <div className="runPeriod">
            {`${data.startDate}~${data.endDate}`}{" "}
          </div>
          <div className="area">{data.area} </div>
          <div className="place">{data.realmName}</div>
          <div className="review">
            {this.props.review.map(review => {
             return <Review review={review}></Review>
            })}
          </div>
        </div>

        <div className="buttonBox">
          <button>공연장 위치 보기</button>
          <button>공연장 홈페이지</button>
          <button>티켓 예매</button>
        </div>
        <div>
          <button onClick={this.props.resetClickedData()}>뒤로 가기</button>
        </div>
      </div>
    );
  }
}

export default ClickedDataEntry;
