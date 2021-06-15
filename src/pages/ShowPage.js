import React, { useEffect } from "react";
import axios from "axios";
import SearchBar from "../Components/SearchBar";
import DataList from "../Components/DataList";
import Nav from "../pages/Nav";
import ClickedDataEntry from "../Components/ClickedDataEntry";
import RecommendDataList from "../Components/RecommendDataList";
// import './ShowPage.css'

axios.defaults.withCredentials = true;

class ShowPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiData: [
        {
          seq: "166695",
          title: "나의 친구, 그림책",
          startDate: "20210102",
          endDate: "20211231",
          place: "ACC 어린이문화원",
          realmName: "미술",
          area: "광주",
          thumbnail:
            "http://www.culture.go.kr/upload/rdf/21/04/rdf_2021042214113608337.gif",
          gpsX: "126.919994481568",
          gpsY: "35.1469155857794",
        },
        {
          seq: "167966",
          title: "이현정 바이올린 독주회",
          startDate: "20210703",
          endDate: "20210703",
          place: "영산양재홀",
          realmName: "음악",
          area: "서울",
          thumbnail:
            "http://www.culture.go.kr/upload/rdf/21/06/rdf_2021061113192585187.jpeg",
          gpsX: "127.03840937755554",
          gpsY: "37.48048582944657",
        },
        {
          seq: "167843",
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
      ],
      clickedData: null, //클릭한 데이터의 정보
      clickedShowData: "", //클릭한 공연의 상세 정보
      review: "", //클릭한 공연의 리뷰 리스트
      recommendData: [
        {
          seq: "166695",
          title: "나의 친구, 그림책",
          startDate: "20210102",
          endDate: "20211231",
          place: "ACC 어린이문화원",
          realmName: "미술",
          area: "광주",
          thumbnail:
            "http://www.culture.go.kr/upload/rdf/21/04/rdf_2021042214113608337.gif",
          gpsX: "126.919994481568",
          gpsY: "35.1469155857794",
        },
        {
          seq: "167843",
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
      ],
      area: "",
      filteredData: null,
    };
    this.hanldeAreaState = this.hanldeAreaState.bind(this);
  }

  componentWillMount() {
    console.log("Component WILL MOUNT!");
    console.log(this.state.apiData);
    this.handleApiData.bind(this);
    this.handleRecommendData.bind(this);
  }

  handleApiData() {
    // 공연 정보 데이터 불러오기.
    axios
      .get("https://localhost:4000/show")
      .then((res) => {
        this.setState({ apiData: res.data.showList });
      })
      .catch((err) => console.log(err, "handleApiData err"));
  }

  handleRecommendData() {
    //장르 추천 공연 불러오기.  //to-do: 시간남으면 filter로 개인맞춤형 데이터만 가져오기
    axios
      .get("https://localhost:4000/recommend/location")
      .then((res) => {
        this.setState({ recommendData: res.data.list });
      })
      .then((res) => axios.get("https://localhost:4000/recommend/genre"))
      .then((res) => {
        const { recommendData } = this.state.recommendData;
        const newRecommendData = [...recommendData, res.data.list];
        this.setState({ recommendData: newRecommendData });
      })
      .catch((err) => console.log(err));
  }

  getClickedApiData = () => {
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
        this.setState({ clickedShowData: res.body.data });
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  setClickedData(data) {
    //공연 상세정보 뿌려주기 위해 ClickedData setState.
    this.setState({ clickedData: data });
    console.log(this.state.clickedData, "clicked Data");
    this.getClickedApiData.bind(this);
    this.getReview.bind(this);
  }

  resetClickedData() {
    //상세보기 에서 뒤로가기 버튼 누를 때, clickedData reset.
    this.setState({ clickedData: null });
  }

  getReview() {
    const { seq } = this.state.clickedData;
    axios
      .get(
        "https://localhost:4000/review/get",
        { seq },
        {
          headers: {
            authorization: `Bearer ${this.props.accessToken}`,
            "Content-type": "application/json",
            Accept: "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        this.setState({ review: res.body.data });
      })
      .catch((err) => console.log(err, "getReview err"));
  }

  areaFiltered(e) {
    const value = e.target.value;
    this.setState({ area: value });
    console.log(this.state);
    const filteredData = this.state.apiData.filter(
      (data) => data.area === this.state.area
    );
    this.setState({ filteredData: filteredData });
    console.log(filteredData);
  }

  hanldeAreaState() {
    console.log("filtered");
  }

  render() {
    return (
      <div className="show-body">
        <div className="bodyWrapper">
          <div className="searchWrapper">
            <SearchBar areaFiltered={this.areaFiltered.bind(this)}></SearchBar>
          </div>
          <div className="mainstream">
            {this.state.clickedData === null ? (
              <div className="apidata">
                <DataList
                  datas={this.state.apiData}
                  handleClickedData={this.setClickedData.bind(this)}
                ></DataList>

                <RecommendDataList
                  recommendData={this.state.recommendData}
                  handleClickedData={this.setClickedData.bind(this)}
                ></RecommendDataList>
              </div>
            ) : (
              <ClickedDataEntry
                clickedDataSeq={this.state.clickedData.seq}
                resetClickedData={this.resetClickedData.bind(this)}
                review={this.state.review}
                getReview={this.getReview.bind(this)}
              ></ClickedDataEntry>
            )}
            {/* // 클릭한 공연 상세정보 출력 */}
            {/* 상세정보에서 뒤로가기 버튼 누르면 clickedData = null 로 변경하는 코드 구현 필요. */}
          </div>
        </div>
      </div>
    );
  }
}

export default ShowPage;
