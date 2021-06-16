import React from "react";
import "./ClickedDataEntry.css";
import { Link, Redirect } from "react-router-dom";

import axios from "axios";
import Review from "../Components/Review";
import MapMarker from "../Components/MapMarker";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

//ShowPage에서 공연 썸네일을 클릭했을 때 나오는 '해당 공연 상세 정보' 페이지 입니다.
class ClickedDataEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      clickedData: {
        id: 5,
        seq: 167843,
        title: "PMF 영아티스트 콘서트_이지언 첼로 리사이틀",
        startDate: "20210710",
        endDate: "20210710",
        place: "PMF자양스테이션",
        realmName: "음악",
        area: "서울",
        thumbnail:
          "http://www.culture.go.kr/upload/rdf/21/06/rdf_202106081662354418.jpg",
        gpsX: "127.08302634367884",
        gpsY: "37.53463130540217",
      },
      content: "너무 재밌어요~",
      point: "5",
      reviewId: 'DDH',
    };
    this.reviewContent = this.reviewContent.bind(this);
    this.createReview = this.createReview.bind(this);
    this.reviewConfirmHandler = this.reviewConfirmHandler.bind(this);
    this.handleInputValue = this.handleInputValue.bind(this);

    // this.hanldeClickedApiData = this.hanldeClickedApiData.bind(this);
  }
  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
    console.log(e.target.value);
    console.log(this.state)
  };

  conponentWillMount() {
    this.setState({ clickedData: this.props.clickedData });
    console.log(this.state.clickedData,'componentwillmount-clickeddata');
  }
  reviewContent = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };

  createReview = () => {
     const { seq } =  this.state.clickedData;
     const { content, point } =  this.state;
    console.log(this.props.accessToken)

    axios
      .post(
        "https://localhost:8080/review/create",
        { seq, content, point },{
          headers: {
              authorization: `Bearer ${this.props.accessToken}`,
          }
      })
      .then((res) => {
        console.log(res,'getReviewres')
        // this.props.getReview();
      })
      .catch((err) => console.log(err));
  };

  reviewConfirmHandler = () => {
    confirmAlert({
      title: "리뷰 작성은 로그인이 필요합니다. 로그인하시겠습니까?",
      buttons: [
        {
          label: "예",
          onClick: () => {
            window.location.href = "/login";
          },
        },
        {
          label: "아니오",
        },
      ],
    });
  };

  render() {
    return (
      <div className="cd-body">
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/js/all.min.js"
          integrity="sha256-qM7QTJSlvtPSxVRjVWNM2OfTAz/3k5ovHOKmKXuYMO4="
          crossorigin="anonymous"
        ></script>
        <div className="clicked_showBox">
          <div>
            <button onClick={this.props.resetClickedData}>뒤로 가기</button>
          </div>
          {/* 왼쪽 공연 썸네일 */}
          <div className="cd-show-left_thumbnail ">
            <img
              className="cd-show-thumbnail"
              src={this.props.clickedData.thumbnail}
              alt=""
            />
          </div>

          {/* 오른쪽 공연 상세 정보 */}
          <div className="cd-show-right_description">
            <div className="cd-show-title">{this.props.clickedData.title}</div>

            <div className="cd-show-parts">
              <div className="cd-show-label">카테고리</div>
              <div className="cd-show-category">
                {this.props.clickedData.realmName}{" "}
              </div>
            </div>

            <div className="cd-show-parts">
              <div className="cd-show-label">공연기간</div>

              <div className="cd-show-runPeriod">
                {`${this.props.clickedData.startDate}~${this.props.clickedData.endDate}`}{" "}
              </div>
            </div>

            <div className="cd-show-parts">
              <div className="cd-show-label">공연지역</div>
              <div className="cd-show-area">{this.props.clickedData.area} </div>
            </div>

            <div className="cd-show-parts">
              <div className="cd-show-label">공연시설</div>
              <div className="cd-show-place">
                {this.props.clickedData.place}
              </div>
            </div>

            <div className="cd-show-parts">
              <div className="cd-show-label">시설위치</div>
            </div>
            <div className="kakaomap">
              <MapMarker data={this.state.clickedData}></MapMarker>
            </div>
            {/* <div className="cd-show-review" //----리뷰-----
          >
            {this.props.review.map((review) => {
              
              return <Review review={review}></Review>;
            })} 
          </div> */}
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="cd-show-writeReview">
                <div className="cd-show-reviewtitle">리뷰 등록</div>
                <input
                  className="cd-show-review"
                  placeholder="리뷰를 작성해주세요"
                  type="text"
                  onChange={this.handleInputValue("reivewContent")}
                ></input>
                <select
                  className="cd-show-rating"
                  onChange={this.handleInputValue("reviewPoint")}
                >
                  <option value="" disabled selected>
                    별점 선택
                  </option>
                  <option value="5">★★★★★</option>
                  <option value="4">★★★★</option>
                  <option value="3">★★★</option>
                  <option value="2">★★</option>
                  <option value="1">★</option>
                </select>
                <div className="cd-show-review">
                  <div className="reviewBox">
                    <div>{this.state.reviewId}</div>
                    <div>{this.state.reivewContent}</div>
                    <div>{this.state.reviewPoint}</div>
                  </div>
                </div>
                {!this.props.isLogin ? (
                  <button
                    className="cd-show-reviewSubmit"
                    onClick={this.reviewConfirmHandler}
                  >
                    리뷰등록
                  </button>
                ) : (
                  <button
                    className="cd-show-reviewSubmit"
                    onClick={this.createReview}
                  >
                    리뷰등록
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="지도"></div>
        </div>
        <div className="cd-show-btn-area">
          <button className="cd-show-btn">Web site</button>
          <button className="cd-show-btn">Tickets</button>
        </div>
      </div>
    );
  }
}

export default ClickedDataEntry;
