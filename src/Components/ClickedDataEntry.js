import React from "react";
import "./ClickedDataEntry.css";
import axios from "axios";
import Review from "../Components/Review";

//ShowPage에서 공연 썸네일을 클릭했을 때 나오는 '해당 공연 상세 정보' 페이지 입니다.
class ClickedDataEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      clickedDataSeq: this.props.clickedDataSeq,
      content: "",
      point:"",
      reviewId: "",
    };
    this.reviewContent = this.reviewContent.bind(this);
    this.createReview = this.createReview.bind(this);
    this.hanldeClickedApiData = this.hanldeClickedApiData.bind(this);
  }

  hanldeClickedApiData = () => {
    //클릭한 공연의 상세 정보 데이터 불러오기.
    const { seq } = this.state.clickedDataSeq;
    axios
      .get("https://localhost:4000/show/detail", seq, {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
      })
      .then((res) => {
        this.setState({ data: res.body.data });
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  reviewContent = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };

  createReview = () => {
    // --------Routing 정보 확인
    const { seq } = this.state.clickedDataSeq;
    const { content, point } = this.state;
    axios
      .post(
        "http://localhost:4000/review/create",
        { seq, content, point },
        {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        this.props.getReview();
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { data } = this.state.data;
    return (
      <div className="cd-body">
      <div className="clicked_showBox">
        <div>
          <button onClick={this.props.resetClickedData()}>뒤로 가기</button>
        </div>
        {/* 왼쪽 공연 썸네일 */}
        <div className="cd-show-left_thumbnail ">
          <img className="cd-show-thumbnail" src={data.thumbnail} alt={data.title} />
        </div>

        {/* 오른쪽 공연 상세 정보 */}
        <div className="cd-show-right_description">
          <div className="cd-show-title">{data.title}</div>
          <div className="cd-show-category">{data.realmName} </div>
          <div className="cd-show-runPeriod">
            {`${data.startDate}~${data.endDate}`}{" "}
          </div>
          <div className="cd-show-area">{data.area} </div>
          <div className="cd-show-place">{data.realmName}</div>
          <div className="cd-show-review" //----리뷰-----
          >
            {this.props.review.map((review) => {
              
              return <Review review={review}></Review>;
            })}
          </div>
          <form onSubmit={(e) => e.preventDefault()}>
          <div className="cd-show-writeReview">
            <input className="cd-show-review" type="text" onChange={this.reviewContent("reivewContent")}></input>
            <select onChange={this.reviewContent("reviewPoint")}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <button onClick={this.createReview}>리뷰등록</button>
          </div>
          </form>
        </div>

        <div className="cd-show-buttonBox">
          <button className="cd-show-location">공연장 위치 보기</button>
          <button className="cd-show-website">공연장 홈페이지</button>
          <button className="cd-show-ticketsite">티켓 예매</button>
        </div>

      </div>
      </div>
    );
  }
}

export default ClickedDataEntry;
