import React from "react";
import "./ClickedDataEntry.css";
import axios from "axios";
import Review from "../Components/Review";
import MapMarker from "../Components/MapMarker"

//ShowPage에서 공연 썸네일을 클릭했을 때 나오는 '해당 공연 상세 정보' 페이지 입니다.
class ClickedDataEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        seq: "166695",
        title: "나의 친구, 그림책",
        startDate: "20210102",
        endDate: "20211231",
        place: "ACC 어린이문화원",
        realmName: "미술",
        area: "광주",
        thumbnail:
          "http://www.culture.go.kr/upload/rdf/21/06/rdf_2021061113192585187.jpeg",
        gpsX: "126.919994481568",
        gpsY: "35.1469155857794",
      },
      clickedDataSeq: this.props.clickedDataSeq,
      content: "짱재밌음",
      point:"5",
      reviewId: "김코딩",
    };
    this.reviewContent = this.reviewContent.bind(this);
    this.createReview = this.createReview.bind(this);
    this.hanldeClickedApiData = this.hanldeClickedApiData.bind(this);
  }

  hanldeClickedApiData = () => {
    //클릭한 공연의 상세 정보 데이터 불러오기.
    // const { seq } = this.state.clickedDataSeq;
    // axios
    //   .get("https://localhost:4000/show/detail", seq, {
    //     headers: {
    //       "Content-type": "application/json",
    //       Accept: "application/json",
    //     },
    //   })
    //   .then((res) => {
    //     this.setState({ data: res.body.data });
    //     console.log(res);
    //   })
      // .catch((err) => console.log(err));
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
    console.log(data)
    return (
      <div className="cd-body">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/js/all.min.js" integrity="sha256-qM7QTJSlvtPSxVRjVWNM2OfTAz/3k5ovHOKmKXuYMO4=" crossorigin="anonymous"></script>
      <div className="clicked_showBox">
      <div>
          <button>뒤로 가기</button>
        </div>
        {/* 왼쪽 공연 썸네일 */}
        <div className="cd-show-left_thumbnail ">
          <img className="cd-show-thumbnail" src="http://www.culture.go.kr/upload/rdf/21/06/rdf_2021061113192585187.jpeg" alt="" />
        </div>

        {/* 오른쪽 공연 상세 정보 */}
        <div className="cd-show-right_description">
          <div className="cd-show-title">이현정 바이올린 독주회</div>

          <div className="cd-show-parts">
             <div className="cd-show-label">카테고리</div>
             <div className="cd-show-category">음악 - 클래식</div>
          </div>
          
          <div className="cd-show-parts">
             <div className="cd-show-label">공연기간</div>
             <div className="cd-show-runPeriod">
                2021. 07. 03 (토) ~ 2021. 07. 03 (토)
             </div>
          </div>

          <div className="cd-show-parts">
              <div className="cd-show-label">공연장소</div>
              <div className="cd-show-area">영산양재홀</div>
          </div>

          <div className="cd-show-parts">
              <div className="cd-show-label">공연시설</div>
              <div className="cd-show-place">대공연장</div>
          </div>

          <div className="cd-show-parts">
              <div className="cd-show-label">시설위치</div>
          </div>

          <div className="kakaomap">
                <MapMarker data={this.state.data}></MapMarker>
          </div>

          {/* <div className="review" //----리뷰-----
          >
            {this.props.review.map((review) => {
              return <Review review={review}></Review>;
            })}
          </div> */}
          <form onSubmit={(e) => e.preventDefault()}>
          <div className="cd-show-writeReview">
            <div className="cd-show-reviewtitle">리뷰 등록</div>
            <input className="cd-show-review" placeholder="리뷰를 작성해주세요" type="text" onChange={this.reviewContent("reivewContent")}></input>
            <select className="cd-show-rating" onChange={this.reviewContent("reviewPoint")}>
              <option value="" disabled selected >별점 선택</option>
              <option value="5">★★★★★</option>
              <option value="4">★★★★</option>
              <option value="3">★★★</option>
              <option value="2">★★</option>
              <option value="1">★</option>
            </select>
            <button className="cd-show-reviewSubmit" onClick={this.createReview}>작성</button>
          </div>
          </form>
        </div>

        <div className="지도">
          
        </div>


      </div>

      <div className='cd-show-btn-area'>
            <button className="cd-show-btn">Web site</button>
            <button className="cd-show-btn">Tickets</button>
          </div>


      </div>
    );
  }
}

export default ClickedDataEntry;
